using System.Data.Entity;
using TouristTravel.Data.Entities;

namespace TouristTravel.Data.Interfaces
{
	public interface IContext
	{
        DbSet<Account> Accounts { get; set; }
        DbSet<NewsLetter> NewsLetters { get; set; }
        DbSet<Country> Countries { get; set; }
        DbSet<FavoriteTourToUser> FavoriteTourToUsers { get; set; }
        DbSet<Tour> Tours { get; set; }
        DbSet<TourSchedule> Schedules { get; set; }

        int SaveChanges();

		DbSet<T> Set<T>() where T : class;
	}
}
