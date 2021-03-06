﻿using AutoMapper;
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
                config.AllowNullCollections = true;
                config.CreateMap<AccountSignUpDto, Account>().ReverseMap();
                config.CreateMap<AccountDto, Account>().ReverseMap();
                config.CreateMap<Account, AccountDto>().ReverseMap();
                config.CreateMap<Tour, TourDto>().ReverseMap();
                config.CreateMap<Country, CountryDto>().ReverseMap();
            });
        }
    }
}
