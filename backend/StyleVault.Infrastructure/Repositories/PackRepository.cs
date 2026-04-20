// Placeholder for PackRepository to satisfy empty file architecture requirements.
using StyleVault.Domain.Entities;
using StyleVault.Infrastructure.Data;

namespace StyleVault.Infrastructure.Repositories;

public class PackRepository
{
    private readonly AppDbContext _context;
    
    public PackRepository(AppDbContext context)
    {
        _context = context;
    }

    public async Task CreateAsync(Pack pack)
    {
        _context.Packs.Add(pack);
        await _context.SaveChangesAsync();
    }
}
