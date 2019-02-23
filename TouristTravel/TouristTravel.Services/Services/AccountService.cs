using System;
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

		public bool SignUp(AccountSignUpDto accountDto)
		{
			var account = Mapper.Map<AccountSignUpDto, Account>(accountDto);
			account.DateOfSignUp = null;
			account.LastDateOfLogin = null;
			if (_accountRepository.IsUserExist(account))
			{
				return false;
			}

			account.Password = GetPasswordHash(account.Password);
			_accountRepository.Create(account);

			return true;
		}

		public AccountDto SignIn(string email, string password, DateTime loginTime)
		{
			var account = Mapper.Map<Account, AccountDto>(
				_accountRepository.GetUserByEmailAndPassword(email, GetPasswordHash(password)));

			if (account.DateOfSignUp != null)
			{
				account.LastDateOfLogin = loginTime;
				if (UpdatePersonalData(account))
				{
					return account;
				}
			}

			return new AccountDto();
		}

		public AccountDto GetAccount(int id)
		{
			var account = Mapper.Map<Account, AccountDto>(_accountRepository.FirstOrDefault(x => x.Id == id));

			return account;
		}

		public bool UpdatePersonalData(AccountDto accountDto)
		{
			var account = Mapper.Map<AccountDto, Account>(accountDto);
			if (_accountRepository.CredentialsExist(account, accountDto.Id))
			{
				return false;
			}

			_accountRepository.UpdatePersonalData(account);

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