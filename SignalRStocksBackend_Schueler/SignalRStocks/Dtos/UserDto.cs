using System.Collections.Generic;

namespace SignalRStocks.Dtos
{
  public class UserDto
  {
    public int Id { get; set; }
    public string Name { get; set; }
    public double Cash { get; set; }
    public List<DepotDto> Depots { get; set; } = new();
  }
}
