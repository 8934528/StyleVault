// Placeholder for CardRepository to satisfy empty file architecture requirements.
using Microsoft.EntityFrameworkCore;
using StyleVault.Domain.Entities;
using StyleVault.Infrastructure.Data;

namespace StyleVault.Infrastructure.Repositories;

public class CardRepository
{
    private readonly AppDbContext _context;
    
    public CardRepository(AppDbContext context)
    {
        _context = context;
    }

    public async Task<List<Card>> GetAllAsync() => await _context.Cards.ToListAsync();
}
