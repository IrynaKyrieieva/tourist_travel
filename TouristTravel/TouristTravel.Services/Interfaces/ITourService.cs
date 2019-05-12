using System.Collections.Generic;
using TouristTravel.Services.Models;

namespace TouristTravel.Services.Interfaces
{
    public interface ITourService
    {
        TourDto GetTourById(int tourId);

        List<TourDto> GetWishList(int accountId);

        List<TourDto> GetRecommendTours(int accountId);

        List<TourDto> GetTours();
    }
}