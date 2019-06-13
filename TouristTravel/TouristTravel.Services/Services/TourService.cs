using System;
using System.Collections.Generic;
using System.Linq;
using TouristTravel.Data.Entities;
using TouristTravel.Data.Interfaces;
using TouristTravel.Services.Interfaces;
using TouristTravel.Services.Models;

namespace TouristTravel.Services.Services
{
    public class TourService : ITourService
    {
        private readonly ITourRepository _tourRepository;
        private readonly IFavoriteToUserRepository _favoriteToUserRepository;
        private readonly ITourSaleRepository _tourSaleRepository;
        private readonly ITourScheduleRepository _tourScheduleRepository;

        public TourService(ITourRepository tourRepository,
                           IFavoriteToUserRepository favoriteToUserRepository,
                           ITourSaleRepository tourSaleRepository,
                           ITourScheduleRepository tourScheduleRepository)
        {
            _tourRepository = tourRepository;
            _favoriteToUserRepository = favoriteToUserRepository;
            _tourSaleRepository = tourSaleRepository;
            _tourScheduleRepository = tourScheduleRepository;
        }

        public TourDto GetTourById(int tourId)
        {
            var tour = _tourScheduleRepository.GetFullInfoById(tourId);
            var tourDto = ConvertToTourDto(tour);
            tourDto.Photos = tour.Tour.TourPhotos.Select(x => x.Url).ToList();

            return tourDto;
        }

        public List<TourDto> GetWishList(int accountId)
        {
            var tours = _favoriteToUserRepository.GetFavoriteTourByAccountId(accountId);
            var toursDto = new List<TourDto>();
            tours.ForEach(x =>
            {
                var tour = ConvertToTourDto(x.TourSchedule);
                tour.IsFavorite = true;
                toursDto.Add(tour);
            });

            return toursDto;
        }

        public List<TourDto> GetRecommendTours(int accountId)
        {
            //algorithm
            throw new System.NotImplementedException();
        }

        public List<TourDto> GetTours()
        {
            throw new NotImplementedException();
        }

        public List<TourDto> GetTours(int accountId)
        {
            var favoriteTours = accountId != 0
                ? _favoriteToUserRepository.GetFavoriteTourByAccountId(accountId)
                :  new List<FavoriteTourToUser>();

            var toursDto = new List<TourDto>();
            var tours = _tourScheduleRepository.GetAllSchedules();
            foreach (var tour in tours)
            {
                var item = ConvertToTourDto(tour);
                item.IsFavorite = favoriteTours.Exists(x => x.TourScheduleId == tour.Id);
                toursDto.Add(item);
            }

            return toursDto;
        }

        public List<TourDto> GetTours(Filters filters)
        {
            var favoriteTours = filters.AccountId != 0
                ? _favoriteToUserRepository.GetFavoriteTourByAccountId(filters.AccountId)
                : new List<FavoriteTourToUser>();

            var toursDto = new List<TourDto>();
            var tours = _tourScheduleRepository.GetAllSchedules().Where(x => 
                filters.CountryId == x.Tour.CountryId &&
                filters.MinPrice < x.Price && filters.MaxPrice> x.Price
                && filters.Adult == x.AdultCount && filters.Children == x.ChildrenCount);
            foreach (var tour in tours)
            {
                var item = ConvertToTourDto(tour);
                item.IsFavorite = favoriteTours.Exists(x => x.TourScheduleId == tour.Id);
                toursDto.Add(item);
            }

            return toursDto;
        }

        public void AddTourToWishList(int accountId, int tourId)
        {
            if (_favoriteToUserRepository.FirstOrDefault(x => x.AccountId == accountId && x.TourScheduleId == tourId) == null)
            {
                _favoriteToUserRepository.Create(
                    new FavoriteTourToUser()
                    {
                        AccountId = accountId,
                        TourScheduleId = tourId,
                        Date = DateTime.Now
            });
            }
        }

        public void DeleteTourToWishList(int accountId, int tourId)
        {
            var favoriteTour = _favoriteToUserRepository
                .FirstOrDefault(x => x.AccountId == accountId && x.TourScheduleId == tourId);
            if (favoriteTour != null)
            {
                _favoriteToUserRepository.Delete(favoriteTour.Id);
            }
        }

        public bool BuyingTour(int accountId, int tourScheduleId, DateTime date)
        {
            try
            {
                _tourSaleRepository.TourPurchase(accountId, tourScheduleId, date);
                return true;
            }
            catch
            {
                return false;
            }
        }

        public List<TourDto> GetPurchasedTours(int accountId)
        {
            return new List<TourDto>();
        }

        public double GetMaxPrice()
        {
            return GetTours(0).Max(x => x.Price);
        }

        private TourDto ConvertToTourDto(TourSchedule tour)
        {
            return new TourDto
            {
                Id = tour.Id,
                TourId = tour.TourId,
                Description = tour.Tour.Description,
                Title = tour.Tour.Title,
                Country = tour.Tour.Country.Name,
                AdultCount = tour.AdultCount,
                ChildrenCount = tour.ChildrenCount,
                DateIn = tour.DateIn,
                DateOut = tour.DateOut,
                Price = tour.Price,
                DefaultImageUrl = tour.Tour.DefaultImageUrl
            };
        }
    }
}