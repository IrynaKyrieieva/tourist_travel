using System;
using System.Web.Http;
using TouristTravel.Services.Interfaces;
using TouristTravel.Services.Models;

namespace TouristTravel.WebApi.Controllers
{
	public class AccountController : ApiController
    {
		private readonly IAccountService _accountService;
		private readonly ILetterService _letterService;

		public AccountController(IAccountService accountService,
                                 ILetterService letterService)
		{
			_accountService = accountService;
            _letterService = letterService;
        }

		[HttpPost]
		[AllowAnonymous]
		public IHttpActionResult SignUp(AccountSignUpDto account)
		{
            try
            {
                var isSignUp = _accountService.SignUp(account);
                if (isSignUp)
                {
                    _letterService.SubscribeOfNewsletter(account.Email, account.DateOfSignUp ?? DateTime.Now.Date);
                }

                return Ok(isSignUp);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
		}

		[HttpGet]
		[AllowAnonymous]
		public IHttpActionResult SignIn(string email, string password, DateTime signInDateTime)
		{
            try
            {
                var account = _accountService.SignIn(email, password, signInDateTime);

                return Ok(account);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

		[HttpGet]
		[AllowAnonymous]
		public IHttpActionResult GetAccountById(int accountId)
		{
            try
            {
                var account = _accountService.GetAccount(accountId);

                return Ok(account);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

		[HttpPost]
		public IHttpActionResult UpdateAccount(AccountDto accountDto)
		{
            try
            {
                var account = _accountService.UpdatePersonalData(accountDto);

                return Ok(account);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
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
