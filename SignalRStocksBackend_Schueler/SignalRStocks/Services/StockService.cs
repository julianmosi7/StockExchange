using SignalRStocks.Dtos;
using SignalRStocks.Entities;
using System;
using System.Collections.Generic;
using System.Linq;

namespace SignalRStocks.Services
{
    public class StockService
    {
        private readonly StockContext db;

        public StockService(StockContext db)
        {
            this.db = db;
        }

        public IEnumerable<Share> GetShares()
        {
            return db.Shares.AsEnumerable();
        }

        public User GetUser(string name)
        {
            return db.Users.Where(x => x.Name == name).FirstOrDefault();
        }

        public IEnumerable<UserShare> GetUserShare(string name)
        {
            return db.UserShares.Where(x => x.User.Name == name).AsEnumerable();
            //return db.UserShares.Where(x => x.User.Name == name).FirstOrDefault();
        }

    }
}
