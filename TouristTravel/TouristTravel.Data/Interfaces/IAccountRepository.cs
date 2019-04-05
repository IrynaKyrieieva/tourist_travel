using System;
using TouristTravel.Data.Entities;

namespace TouristTravel.Data.Interfaces
{
	public interface IAccountRepository : IRepository<Account>
	{
		Account GetAccountByEmailAndPassword(string email, string password);

		bool IsAccountExist(Account account);

		bool UpdatePersonalData(Account account);

		bool CredentialsExist(Account account, int id);

		bool SignUpByEmail(DateTime signUpDateTime, int id);

        bool ChangePassword(int id, string password);

        bool UpdateLoginDateTime(int id, DateTime loginDateTime);
    }
}