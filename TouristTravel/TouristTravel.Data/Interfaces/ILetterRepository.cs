using TouristTravel.Data.Entities;

namespace TouristTravel.Data.Interfaces
{
	public interface ILetterRepository : IRepository<NewsLetter>
	{
		bool IsEmailExist(string email);
	}
}