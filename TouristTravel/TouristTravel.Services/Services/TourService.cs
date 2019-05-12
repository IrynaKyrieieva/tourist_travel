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

        public TourService(ITourRepository tourRepository)
        {
            _tourRepository = tourRepository;
        }

        public TourDto GetTourById(int tourId)
        {
            //var tour = Mapper.Map<Tour, TourDto>(_tourRepository.GetById(tourId));
            //return tour;

            return new TourDto()
                   {
                       Id = 1,
                       Description = "Test description",
                       IsFavorite = false,
                       Title = "TEEEEEST",
                       ImageUrl = "1.jpg"
                   };
        }

        public List<TourDto> GetWishList(int accountId)
        {
            throw new System.NotImplementedException();
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
    }
}