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
		public DbSet<Country> Countries { get; set; }
		public DbSet<FavoriteTourToUser> FavoriteTourToUsers { get; set; }
		public DbSet<Tour> Tours { get; set; }
        public DbSet<TourSchedule> Schedules { get; set; }
        public DbSet<TourSale> TourSales { get; set; }

        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            modelBuilder.Entity<FavoriteTourToUser>()
                        .HasRequired(c => c.TourSchedule)
                        .WithMany()
                        .WillCascadeOnDelete(false);

            modelBuilder.Entity<TourSale>()
                        .HasRequired(c => c.TourSchedule)
                        .WithMany()
                        .WillCascadeOnDelete(false);

            base.OnModelCreating(modelBuilder);
        }
    }
}
