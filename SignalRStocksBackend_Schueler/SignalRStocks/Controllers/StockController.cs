using MathNet.Numerics.Interpolation;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;
using SignalRStocks.Dtos;
using SignalRStocks.Entities;
using SignalRStocks.Services;
using System;
using System.Collections.Generic;
using System.Linq;

namespace SignalRStocks.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class StockController : ControllerBase
    {
        private readonly StockTickerService stockTickerService;
        private readonly StockService stockService;

        public StockController(StockTickerService stockTickerService, StockService stockService)
        {
            this.stockTickerService = stockTickerService; //to force start the ticker
            this.stockService = stockService;
        }


        [HttpGet]
        public string Testerl()
        {
            //call this method if the ticker does not start
            Console.WriteLine($"StockController::Testerl");
            return "Done";
        }

        [HttpGet("{name}")]
        public UserDto GetUser(string name)
        {
            Console.WriteLine($"name: {name}");
            //UserShare userShare = stockService.GetUser(name);
            User user = stockService.GetUser(name);
            Console.WriteLine($"UserShare: {user}, Amount: {user.Name}");
            return new UserDto
            {
                Id = user.Id,
                Name = user.Name,
                Cash = user.Cash
            };
        }

        [HttpGet("{name}")]
        public UserDto GetUserShare(string name)
        {
            IEnumerable<UserShare> shares = stockService.GetUserShare(name);
            return new UserDto
            {
                Id = shares.First().User.Id,
                Name = shares.First().User.Name,
                Cash = shares.First().User.Cash,
                Depots = shares.Select(x => new DepotDto { Amount = x.Amount, ShareName = x.Share.Name }).ToList()
            };
        }

        [HttpGet]
        public IEnumerable<ShareDto> GetShares()
        {
            return stockService.GetShares().Select(x => new ShareDto
            {
                Id = x.Id,
                Name = x.Name,
                UnitsInStock = x.UnitsInStock
            });
        }

    }
}
