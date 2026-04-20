using Microsoft.EntityFrameworkCore;
using StyleVault.Domain.Entities;

namespace StyleVault.Application.Interfaces;

public interface IAppDbContext
{
    DbSet<User> Users { get; set; }
    DbSet<Card> Cards { get; set; }
    DbSet<Pack> Packs { get; set; }
    DbSet<PackCard> PackCards { get; set; }
    Task<int> SaveChangesAsync(CancellationToken cancellationToken = default);
}
