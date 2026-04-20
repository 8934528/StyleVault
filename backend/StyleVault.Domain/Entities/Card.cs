using StyleVault.Domain.Enums;

namespace StyleVault.Domain.Entities;

public class Card
{
    public Guid CardId { get; set; } = Guid.NewGuid();
    public int CardNumber { get; set; }
    public string CardName { get; set; } = string.Empty;
    public decimal Value { get; set; }
    public double Probability { get; set; } // Probability percentage 0 to 100
    public CardRarity Rarity { get; set; }

    // Property
    public ICollection<PackCard> PackCards { get; set; } = new List<PackCard>();
}
