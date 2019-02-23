using System.ComponentModel.DataAnnotations;

namespace TouristTravel.Data.Entities
{
	public class Country
	{
		public int Id { get; set; }

		[Required]
		[MaxLength(100)]
		public string Name { get; set; }

		[Required]
		public string Description { get; set; }
	}
}