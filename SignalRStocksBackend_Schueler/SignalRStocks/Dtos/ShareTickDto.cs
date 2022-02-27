namespace SignalRStocks.Dtos
{
  public class ShareTickDto
  {
    public string Name { get; set; }
    public double Val { get; set; }
    public override string ToString() => $"{Name} {Val:0.0}";
  }
}
