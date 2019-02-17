using AutoMapper;
using TouristTravel.Data.Entities;
using TouristTravel.Services.Models;

namespace TouristTravel.Services.Helper
{
	public class AutoMapperConfig
	{
		public static void Initialize()
		{
			Mapper.Initialize((config) =>
			{
				config.CreateMap<AccountDto, Account>().ReverseMap();
				config.CreateMap<Account, AccountDto>().ReverseMap();
			});
		}
	}
}
