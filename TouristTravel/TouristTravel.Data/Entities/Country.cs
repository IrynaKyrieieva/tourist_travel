using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace TouristTravel.Data.Entities
{
	public class Country
	{
        [Key]
        public int Id { get; set; }

		[Required]
		[MaxLength(100)]
		public string Name { get; set; }

        [Required]
        [MaxLength(5)]
        public string CountryCode { get; set; }


        public ICollection<Tour> Tours { get; set; }
        public ICollection<Account> Accounts { get; set; }
    }
}