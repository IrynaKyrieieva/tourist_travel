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
			if (_accountRepository.IsAccountExist(account))
			{
				return false;
			}

			account.Password = GetPasswordHash(account.Password);
			_accountRepository.Create(account);

			return true;
		}

		public AccountDto SignIn(string email, string password, DateTime loginTime)
		{
			var account = _accountRepository.GetAccountByEmailAndPassword(email, GetPasswordHash(password));

			if (account != null)
			{
				account.LastDateOfLogin = loginTime;
				if (_accountRepository.UpdateLoginDateTime(account.Id, loginTime))
				{
					return Mapper.Map<Account, AccountDto>(account);
				}
			}

			return new AccountDto();
		}

		public AccountDto GetAccount(int id)
		{
			var account = Mapper.Map<Account, AccountDto>(_accountRepository.FirstOrDefault(x => x.Id == id));

			return account;
		}

		public bool ChangePassword(ChangePasswordData passwordData)
        {
            var account = _accountRepository.FirstOrDefault(x => x.Id == passwordData.AccountId);
            if (account != null && GetPasswordHash(passwordData.OldPassword) == account.Password)
            {
                if (passwordData.NewPassword == passwordData.OldPassword)
                {
                    throw new Exception("Cannot use old password!");
                }
                var password = GetPasswordHash(passwordData.NewPassword);
                return _accountRepository.ChangePassword(passwordData.AccountId, password);
            }

            return false;
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