using System.Linq;
using TouristTravel.Data.Entities;
using TouristTravel.Data.Interfaces;

namespace TouristTravel.Data.Repositories
{
	public class LetterRepository : CommonRepository<NewsLetter>, ILetterRepository
	{
		public LetterRepository(IContext context) : base(context)
		{
		}

		public bool IsEmailExist(string email)
		{
			var isExist = Db.NewsLetters.Any(x => x.Email == email);

			return isExist;
		}
	}
}