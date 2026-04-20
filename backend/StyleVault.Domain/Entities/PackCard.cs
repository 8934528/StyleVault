namespace StyleVault.Domain.Entities;

public class PackCard
{
    public Guid PackCardId { get; set; } = Guid.NewGuid();
    public Guid PackId { get; set; }
    public Guid CardId { get; set; }
    public int SlotIndex { get; set; } // e.g., 1, 2, or 3 representing position

    // Properties
    public Pack? Pack { get; set; }
    public Card? Card { get; set; }
}
