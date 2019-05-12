using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace TouristTravel.Data.Entities
{
	public class Tour
	{
        [Key]
        public int Id { get; set; }

        public string Title { get; set; }

        public string Description { get; set; }

        public int CountryId { get; set; }

        public ICollection<FavoriteTourToUser> FavoriteTourToAccounts { get; set; }

        public Country Country { get; set; }
    }
}