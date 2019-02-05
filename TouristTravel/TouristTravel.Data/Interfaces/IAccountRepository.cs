using TouristTravel.Data.Entities;

namespace TouristTravel.Data.Interfaces
{
	public interface IAccountRepository : IRepository<Account>
	{
		string SignUp(string name);
	}
}