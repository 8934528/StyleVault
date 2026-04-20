using StyleVault.Domain.Entities;

namespace StyleVault.Application.DTOs;

public class PackResultDto
{
    public Guid PackId { get; set; }
    public decimal TotalWon { get; set; }
    public decimal NewBalance { get; set; }
    public List<CardDto> Cards { get; set; } = new();
}

public class CardDto
{
    public Guid CardId { get; set; }
    public string CardName { get; set; } = string.Empty;
    public decimal Value { get; set; }
    public int Rarity { get; set; }
}
