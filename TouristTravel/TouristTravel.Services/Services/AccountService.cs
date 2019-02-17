using System.Configuration;
using System.Security.Cryptography;
using System.Text;
using AutoMapper;
using TouristTravel.Data.Entities;
using TouristTravel.Data.Interfaces;
using TouristTravel.Services.Interfaces;
using TouristTravel.Services.Models;

namespace TouristTravel.Services.Services
{
	public class AccountService : IAccountService
	{
		private readonly IAccountRepository _accountRepository;

		public AccountService(IAccountRepository accountRepository)
		{
			_accountRepository = accountRepository;
		}

		public string Test()
		{
			return "Hello Friend!";
		}

		public bool SignUp(AccountDto accountDto)
		{
			var account = Mapper.Map<AccountDto, Account>(accountDto);
			if (_accountRepository.IsUserExist(account))
			{
				return false;
			}

			account.Password = GetPasswordHash(account.Password);
			_accountRepository.Create(account);

			return true;
		}

		public AccountDto ValidateAccount(string email, string password)
		{
			var account = Mapper.Map<Account, AccountDto>(
				_accountRepository.GetUserByEmailAndPassword(email, GetPasswordHash(password)));
			
			return account;
		}

		public AccountDto GetAccount(int id)
		{
			var account = Mapper.Map<Account, AccountDto>(_accountRepository.FirstOrDefault(x => x.Id == id));

			return account;
		}

		public bool UpdatePersonalData(AccountDto accountDto)
		{
			var user = Mapper.Map<AccountDto, Account>(accountDto);
			if (_accountRepository.CredentialsExist(user, accountDto.Id))
			{
				return false;
			}

			_accountRepository.UpdatePersonalData(user);

			return true;
		}

		private string GetPasswordHash(string password)
		{
			using (var sha256Hash = SHA256.Create())
			{
				var bytesHash = sha256Hash.ComputeHash(Encoding.UTF8.GetBytes(ConfigurationManager.AppSettings.Get("CryptoSalt") + password));
				return Encoding.UTF8.GetString(bytesHash);
			}
		}
	}
}