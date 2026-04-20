namespace StyleVault.Domain.Entities;

public class Pack
{
    public Guid PackId { get; set; } = Guid.NewGuid();
    public Guid UserId { get; set; }
    public decimal Cost { get; set; }
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

    // total value from contained cards
    public decimal TotalValue => PackCards?.Sum(pc => pc.Card?.Value ?? 0) ?? 0;

    // Properties
    public User? User { get; set; }
    public ICollection<PackCard> PackCards { get; set; } = new List<PackCard>();
}
