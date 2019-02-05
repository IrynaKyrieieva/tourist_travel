using TouristTravel.Data.Interfaces;
using TouristTravel.Services.Interfaces;

namespace TouristTravel.Services.Services
{
	public class AccountService : IAccountService
	{
		private readonly IAccountRepository _accountRepository;

		public AccountService(IAccountRepository accountRepository)
		{
			_accountRepository = accountRepository;
		}

		public string SignUp(string name)
		{
			return _accountRepository.SignUp(name);
		}
	}
}