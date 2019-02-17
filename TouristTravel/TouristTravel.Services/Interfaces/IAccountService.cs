using TouristTravel.Services.Models;

namespace TouristTravel.Services.Interfaces
{
	public interface IAccountService
	{
		string Test();
		bool SignUp(AccountDto accountDto);
		bool UpdatePersonalData(AccountDto accountDto);
		AccountDto ValidateAccount(string email, string password);
		AccountDto GetAccount(int id);
	}
}