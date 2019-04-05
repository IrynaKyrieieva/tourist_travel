using System;
using TouristTravel.Services.Models;

namespace TouristTravel.Services.Interfaces
{
	public interface IAccountService
	{
		bool SignUp(AccountSignUpDto accountDto);
		bool UpdatePersonalData(AccountDto accountDto);
		AccountDto SignIn(string email, string password, DateTime loginTime);
		AccountDto GetAccount(int id);
		bool ChangePassword(ChangePasswordData passwordData);
	}
}