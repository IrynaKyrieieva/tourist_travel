using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace TouristTravel.Data.Entities
{
	public class Account
	{
        [Key]
		public int Id { get; set; }

		[Required]
		public string FirstName { get; set; }

		[Required]
		public string LastName { get; set; }

		[Required]
		public string Email { get; set; }

		[Required]
		public string Phone { get; set; }

		[Required]
		public string Password { get; set; }

        public string Gender { get; set; }

        public int CountryId { get; set; }

        public DateTime? Birthday { get; set; }

        public DateTime? DateOfSignUp { get; set; }

        public DateTime? LastDateOfLogin { get; set; }


        public ICollection<FavoriteTourToUser> FavoriteTourToAccounts { get; set; }

        public ICollection<TourSale> TourSales { get; set; }

        public Country Country { get; set; }
    }
}
