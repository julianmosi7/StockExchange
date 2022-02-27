namespace SignalRStocks.Entities
{
  public class Share
  {
    public int Id { get; set; }
    public string Name { get; set; }
    public int UnitsInStock { get; set; }
    public double StartPrice { get; set; }
  }
}
