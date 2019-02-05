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
	}
}
