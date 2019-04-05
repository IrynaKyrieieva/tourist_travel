using System;
using System.Linq;
using TouristTravel.Data.Entities;
using TouristTravel.Data.Interfaces;

namespace TouristTravel.Data.Repositories
{
	public class AccountRepository : CommonRepository<Account>, IAccountRepository
	{
		public AccountRepository(IContext db) : base(db) {}

		public Account GetAccountByEmailAndPassword(string email, string password)
		{
			return Db.Accounts.FirstOrDefault(user => user.Email == email && user.Password == password);
		}

		public bool IsAccountExist(Account account)
		{
			var isExist = Db.Accounts.Any(x => x.Phone == account.Phone || x.Email == account.Email);

			return isExist;
		}

		public bool UpdatePersonalData(Account account)
		{
			var changeAccount = Db.Accounts.First(x => x.Id == account.Id);
            if (changeAccount != null)
            {
                changeAccount.Email = account.Email;
                changeAccount.Phone = account.Phone;
                changeAccount.FirstName = account.FirstName;
                changeAccount.LastName = account.LastName;
                Save();

                return true;
            }

			return false;
		}

		public bool CredentialsExist(Account account, int id)
		{
			var isExist = Db.Accounts.Any(x => (x.Email == account.Email) && x.Id != id);

			return isExist;
		}

		public bool SignUpByEmail(DateTime signUpDateTime, int id)
		{
			var account = GetById(id);
			account.DateOfSignUp = signUpDateTime;
			var isAccountSignIn = UpdatePersonalData(account);

			return isAccountSignIn;
		}

        public bool ChangePassword(int id, string password)
        {
            var account = Db.Accounts.First(x => x.Id == id);
            if (account != null)
            {
                account.Password = password;
                Save();

                return true;
            }

            return false;
        }

        public bool UpdateLoginDateTime(int id, DateTime loginDateTime)
        {
            var account = Db.Accounts.First(x => x.Id == id);
            if (account != null)
            {
                account.LastDateOfLogin = loginDateTime;
                Save();

                return true;
            }

            return false;
        }
    }
}