using System.Data.Entity;
using TouristTravel.Data.Entities;

namespace TouristTravel.Data.Interfaces
{
	public interface IContext
	{
		DbSet<Account> Accounts { get; set; }
		DbSet<NewsLetter> NewsLetters { get; set; }

		int SaveChanges();

		DbSet<T> Set<T>() where T : class;
	}
}
