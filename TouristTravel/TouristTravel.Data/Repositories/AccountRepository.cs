using TouristTravel.Data.Entities;
using TouristTravel.Data.Interfaces;

namespace TouristTravel.Data.Repositories
{
	public class AccountRepository : CommonRepository<Account>, IAccountRepository
	{
		public AccountRepository(IContext db) : base(db) {}

		public string SignUp(string name)
		{
			return name;
		}
	}
}