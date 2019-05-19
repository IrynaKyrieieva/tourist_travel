using System.Collections.Generic;
using System.Linq;
using AutoMapper;
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

        public TourService(ITourRepository tourRepository,
                           IFavoriteToUserRepository favoriteToUserRepository)
        {
            _tourRepository = tourRepository;
            _favoriteToUserRepository = favoriteToUserRepository;
        }

        public TourDto GetTourById(int tourId)
        {
            var tour = Mapper.Map<Tour, TourDto>(_tourRepository.GetById(tourId));

            return tour;
            //return new TourDto()
            //{
            //    Id = 1,
            //    Description = "Test description",
            //    IsFavorite = false,
            //    Title = "TEEEEEST",
            //    ImageUrl = "1.jpg"
            //};
        }

        public List<TourDto> GetWishList(int accountId)
        {
            var tours = _favoriteToUserRepository.GetFavoriteTourByAccountId(accountId);
            var toursDto = new List<TourDto>();
            tours.ForEach(x =>
            {
                var tour = Mapper.Map<Tour, TourDto>(x.Tour);
                tour.IsFavorite = true;
                toursDto.Add(tour);
            });

            return toursDto;
        }

        public List<TourDto> GetRecommendTours(int accountId)
        {
            throw new System.NotImplementedException();
        }

        public List<TourDto> GetTours()
        {
            var tours = Mapper.Map<IEnumerable<Tour>, IEnumerable<TourDto>>(_tourRepository.GetAll());
            return tours.ToList();
        }

        public void AddTourToWishList(int accountId, int tourId)
        {
            if (_favoriteToUserRepository.FirstOrDefault(x => x.AccountId == accountId && x.TourId == tourId) == null)
            {
                _favoriteToUserRepository.Create(
                    new FavoriteTourToUser()
                    {
                        AccountId = accountId,
                        TourId = tourId
                    });
            }
        }

        public void DeleteTourToWishList(int accountId, int tourId)
        {
            var favoriteTour = _favoriteToUserRepository
                .FirstOrDefault(x => x.AccountId == accountId && x.TourId == tourId);
            if (favoriteTour != null)
            {
                _favoriteToUserRepository.Delete(favoriteTour.Id);
            }
        }
    }
}