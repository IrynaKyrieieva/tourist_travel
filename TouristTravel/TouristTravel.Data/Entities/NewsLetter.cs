using System;
using System.ComponentModel.DataAnnotations;

namespace TouristTravel.Data.Entities
{
	public class NewsLetter
	{
		public int Id { get; set; }

		[Required]
		public string Email { get; set; }

		[Required]
		public DateTime DateOfSubscribe { get; set; }

		public DateTime? DateOfLastEmail { get; set; }
	}
}
