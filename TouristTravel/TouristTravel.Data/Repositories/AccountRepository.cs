using System;
using System.Linq;
using TouristTravel.Data.Entities;
using TouristTravel.Data.Interfaces;

namespace TouristTravel.Data.Repositories
{
	public class AccountRepository : CommonRepository<Account>, IAccountRepository
	{
		public AccountRepository(IContext db) : base(db) {}

		public Account GetUserByEmailAndPassword(string email, string password)
		{
			return Db.Accounts.FirstOrDefault(user => user.Email == email && user.Password == password);
		}

		public bool IsUserExist(Account account)
		{
			var isExist = Db.Accounts.Any(x => x.Phone == account.Phone || x.Email == account.Email);

			return isExist;
		}

		public bool UpdatePersonalData(Account account)
		{
			var changeUser = Db.Accounts.First(x => x.Id == account.Id);
			changeUser.Email = account.Email;
			changeUser.Phone = account.Phone;
			changeUser.FirstName = account.FirstName;
			changeUser.LastName = account.LastName;

			Save();

			return true;
		}

		public bool CredentialsExist(Account account, int id)
		{
			var isExist = Db.Accounts.Any(x => (x.Email == account.Email) && x.Id != id);

			return isExist;
		}

		public bool UpdateLoginDate(DateTime loginDateTime, int id)
		{
			var account = GetById(id);
			account.LastDateOfLogin = loginDateTime;
			var isAccountUpdated = UpdatePersonalData(account);

			return isAccountUpdated;
		}

		public bool SignUpByEmail(DateTime signUpDateTime, int id)
		{
			var account = GetById(id);
			account.DateOfSignUp = signUpDateTime;
			var isAccountSignIn = UpdatePersonalData(account);

			return isAccountSignIn;
		}
	}
}