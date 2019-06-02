using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using TouristTravel.Data.Entities;
using TouristTravel.Data.Interfaces;

namespace TouristTravel.Data.Repositories
{
    public class FavoriteToUserRepository : CommonRepository<FavoriteTourToUser>, IFavoriteToUserRepository
    {
        public FavoriteToUserRepository(IContext context) 
            : base(context)
        {
        }

        public List<FavoriteTourToUser> GetFavoriteTourByAccountId(int accountId)
        {
            return Db.FavoriteTourToUsers.Where(x => x.AccountId == accountId)
                .Include(x => x.Tour)
                .ToList();
        }
    }
}