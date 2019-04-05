using System;
using System.Web.Http;
using TouristTravel.Services.Interfaces;
using TouristTravel.Services.Models;

namespace TouristTravel.WebApi.Controllers
{
	public class AccountController : ApiController
    {
		private readonly IAccountService _accountService;

		public AccountController(IAccountService accountService)
		{
			_accountService = accountService;
		}

		[HttpPost]
		[AllowAnonymous]
		public IHttpActionResult SignUp(AccountSignUpDto account)
		{
			var isSignUp = _accountService.SignUp(account);

			return Ok(isSignUp);
		}

		[HttpGet]
		[AllowAnonymous]
		public IHttpActionResult SignIn(string email, string password, DateTime signInDateTime)
		{
			var account = _accountService.SignIn(email, password, signInDateTime);

			return Ok(account);
		}

		[HttpGet]
		[AllowAnonymous]
		public IHttpActionResult GetAccountById(int accountId)
		{
			var account = _accountService.GetAccount(accountId);

			return Ok(account);
		}

		[HttpPost]
		public IHttpActionResult UpdateAccount(AccountDto accountDto)
		{
			var account = _accountService.UpdatePersonalData(accountDto);

			return Ok(account);
		}

		[HttpPost]
		public IHttpActionResult UpdatePassword(ChangePasswordData passwordData)
		{
            try
            {
                var isUpdate = _accountService.ChangePassword(passwordData);

                return Ok(isUpdate);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
		}
	}
}
