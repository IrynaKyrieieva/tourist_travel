using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
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
            throw new System.NotImplementedException();
        }

        public List<Tour> GetFavoriteTours(int accountId)
        {
            var tours = Db.FavoriteTourToUsers.Where(x => x.AccountId == accountId)
                          .Include(x => x.Tour)
                          .ToList();

            return tours;
        }
    }
}