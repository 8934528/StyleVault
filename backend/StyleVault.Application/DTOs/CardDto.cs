namespace StyleVault.Application.DTOs;

public class CardInfoDto
{
    public Guid CardId { get; set; }
    public int CardNumber { get; set; }
    public string CardName { get; set; } = string.Empty;
    public decimal Value { get; set; }
    public double Probability { get; set; }
    public int Rarity { get; set; }
}
