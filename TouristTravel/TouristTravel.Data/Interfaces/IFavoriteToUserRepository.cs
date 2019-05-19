using System.Collections.Generic;
using TouristTravel.Data.Entities;

namespace TouristTravel.Data.Interfaces
{
    public interface IFavoriteToUserRepository : IRepository<FavoriteTourToUser>
    {
        List<FavoriteTourToUser> GetFavoriteTourByAccountId(int accountId);
    }
}