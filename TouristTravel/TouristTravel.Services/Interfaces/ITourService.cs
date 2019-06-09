using System;
using System.Collections.Generic;
using TouristTravel.Services.Models;
using TouristTravel.Services.Services;

namespace TouristTravel.Services.Interfaces
{
    public interface ITourService
    {
        TourDto GetTourById(int tourId);

        List<TourDto> GetWishList(int accountId);

        List<TourDto> GetRecommendTours(int accountId);

        List<TourDto> GetTours();

        List<TourDto> GetTours(int accountId);

        List<TourDto> GetTours(TourFilters filters);

        void AddTourToWishList(int accountId, int tourId);

        void DeleteTourToWishList(int accountId, int tourId);

        bool BuyingTour(int accountId, int tourScheduleId, DateTime date);

        List<TourDto> GetPurchasedTours(int accountId);
    }
}