using System;

namespace TouristTravel.Services.Models
{
	public class AccountDto
	{
		public int Id { get; set; }
		
		public string Name { get; set; }
		
		public string Email { get; set; }
		
		public string Phone { get; set; }

		public DateTime? DateOfSignUp { get; set; }

		public DateTime? LastDateOfLogin { get; set; }
	}
}
