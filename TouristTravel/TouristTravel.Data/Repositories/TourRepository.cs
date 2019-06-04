using System.Collections.Generic;
using TouristTravel.Data.Entities;
using TouristTravel.Data.Interfaces;

namespace TouristTravel.Data.Repositories
{
    public class TourRepository : CommonRepository<Tour>, ITourRepository
    {
        public TourRepository(IContext context) : base(context)
        {

        }

        public Tour GetTourById(int tourId)
        {
            return new Tour();
        }

        public List<Tour> GetTourByFilters()
        {
            throw new System.NotImplementedException();
        }
    }
}