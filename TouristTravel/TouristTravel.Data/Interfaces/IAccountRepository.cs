using TouristTravel.Data.Entities;

namespace TouristTravel.Data.Interfaces
{
	public interface IAccountRepository : IRepository<Account>
	{
		Account GetUserByEmailAndPassword(string email, string password);

		bool IsUserExist(Account account);

		bool UpdatePersonalData(Account account);

		bool CredentialsExist(Account account, int id);
	}
}