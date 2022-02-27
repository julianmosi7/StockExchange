namespace SignalRStocks.Dtos
{
  public class TransactionDto
  {
    public string Username { get; set; }
    public string ShareName { get; set; }
    public int Amount { get; set; }
    public double Price { get; set; }
    public int UnitsInStockNow { get; set; }
    public bool IsUserBuy { get; set; }
  }
}
