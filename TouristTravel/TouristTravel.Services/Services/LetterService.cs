using System;
using TouristTravel.Data.Entities;
using TouristTravel.Data.Interfaces;
using TouristTravel.Services.Interfaces;

namespace TouristTravel.Services.Services
{
	public class LetterService: ILetterService
	{
		private readonly ILetterRepository _letterRepository;

		public LetterService(ILetterRepository letterRepository)
		{
			_letterRepository = letterRepository;
		}

		public bool SubscribeOfNewsletter(string email, DateTime date)
		{
			if (_letterRepository.IsEmailExist(email))
			{
				return false;
			}

			var newsletter = new NewsLetter
			{
				Email = email,
				DateOfSubscribe = date
			};

			_letterRepository.Create(newsletter);
			return true;
		}
	}
}