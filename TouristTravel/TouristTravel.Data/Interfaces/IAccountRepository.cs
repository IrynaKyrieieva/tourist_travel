﻿using System;
using TouristTravel.Data.Entities;

namespace TouristTravel.Data.Interfaces
{
	public interface IAccountRepository : IRepository<Account>
	{
		Account GetUserByEmailAndPassword(string email, string password);

		bool IsUserExist(Account account);

		bool UpdatePersonalData(Account account);

		bool CredentialsExist(Account account, int id);

		bool UpdateLoginDate(DateTime loginDateTime, int id);

		bool SignUpByEmail(DateTime signUpDateTime, int id);
	}
}