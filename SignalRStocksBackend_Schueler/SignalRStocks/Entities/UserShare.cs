namespace SignalRStocks.Entities
{
  public class UserShare
  {
    public int Id { get; set; }
    public Share Share { get; set; }
    public User User { get; set; }
    public int Amount { get; set; }
  }
}
