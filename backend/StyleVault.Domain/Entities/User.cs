namespace StyleVault.Domain.Entities;

public class User
{
    public Guid UserId { get; set; } = Guid.NewGuid();
    public string Username { get; set; } = string.Empty;
    public decimal Coins { get; set; } = 100m; // Default starting balance
    
    // Property
    public ICollection<Pack> Packs { get; set; } = new List<Pack>();
}
