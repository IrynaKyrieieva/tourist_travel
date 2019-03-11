using System;

namespace TouristTravel.Services.Interfaces
{
	public interface ILetterService
	{
		bool SubscribeOfNewsletter(string email, DateTime date);
	}
}