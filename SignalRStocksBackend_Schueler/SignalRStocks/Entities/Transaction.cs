using System;

namespace SignalRStocks.Entities
{
  public class Transaction
  {
    public int Id { get; set; }
    public DateTime Timestamp { get; set; }
    public Share Share { get; set; }
    public User User { get; set; }
    public double UnitPrice { get; set; }
    public int Amount { get; set; }
    public bool IsUserBuy { get; set; }
  }
}
