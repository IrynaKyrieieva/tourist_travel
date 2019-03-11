using System.Data.Entity;
using TouristTravel.Data.Entities;
using TouristTravel.Data.Interfaces;

namespace TouristTravel.Data
{
	public class Context : DbContext, IContext
	{
		public Context() : base("name=TouristTravelConnectionString")
		{
			Database.SetInitializer(new DropCreateDatabaseIfModelChanges<Context>());
		}

		public DbSet<Account> Accounts { get; set; }
		public DbSet<NewsLetter> NewsLetters { get; set; }
		public DbSet<Country> Countries { get; set; }
		public DbSet<Sale> Sales { get; set; }
		public DbSet<Trip> Trips { get; set; }

	}
}
