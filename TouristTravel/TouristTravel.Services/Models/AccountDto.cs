using System;

namespace TouristTravel.Services.Models
{
	public class AccountDto
	{
		public int Id { get; set; }
		
		public string FirstName { get; set; }
		
		public string LastName { get; set; }

		public string Email { get; set; }

        public string Gender { get; set; }

        public int CountryId { get; set; }

        public DateTime Birthday { get; set; }

		public DateTime? DateOfSignUp { get; set; }

		public DateTime? LastDateOfLogin { get; set; }
	}
}
