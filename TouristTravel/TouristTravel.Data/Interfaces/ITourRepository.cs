using System.Collections.Generic;
using TouristTravel.Data.Entities;

namespace TouristTravel.Data.Interfaces
{
    public interface ITourRepository : IRepository<Tour>
    {
        Tour GetTourById(int tourId);
        List<Tour> GetFavoriteTours(int accountId);
    }
}