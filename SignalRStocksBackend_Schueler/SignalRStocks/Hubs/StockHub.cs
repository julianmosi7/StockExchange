using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.SignalR;
using Newtonsoft.Json;
using SignalRStocks.Dtos;

namespace SignalRStocks.Hubs
{
    public class StockHub : Hub
    {
        public static List<string> clientsConnectedIds = new List<string>();

        public void BuyShare(TransactionDto transaction)
        {
            Console.WriteLine($"user: {transaction.Username}, shareName: {transaction.ShareName}, amount: {transaction.Amount}, price: {transaction.Price}, unitsInStock: {transaction.UnitsInStockNow}, isUserBuy: {transaction.IsUserBuy}");
            Clients.All.SendAsync("transactionReceived", transaction);
        }

        public void SellShare(TransactionDto transaction)
        {
            Clients.All.SendAsync("transactionReceived", transaction);
        }

        public override Task OnConnectedAsync()
        {
            clientsConnectedIds.Add(Context.ConnectionId);
            CountClients(clientsConnectedIds.Count);
            return base.OnConnectedAsync();
        }

        public override Task OnDisconnectedAsync(Exception exception)
        {
            clientsConnectedIds.Remove(Context.ConnectionId);
            CountClients(clientsConnectedIds.Count);
            return base.OnDisconnectedAsync(exception);
        }

        public void CountClients(int clients)
        {
            Console.WriteLine($"Connected clients: ${clients}");
            Clients.All.SendAsync("connect", clients);
        }
    }
}
