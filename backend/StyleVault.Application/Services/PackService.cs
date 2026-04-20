using Microsoft.EntityFrameworkCore;
using StyleVault.Application.DTOs;
using StyleVault.Application.Interfaces;
using StyleVault.Domain.Entities;

namespace StyleVault.Application.Services;

public class PackService : IPackService
{
    private readonly IAppDbContext _context;
    private readonly ProbabilityEngine _probabilityEngine;
    private const decimal PackCost = 20m;

    public PackService(IAppDbContext context, ProbabilityEngine probabilityEngine)
    {
        _context = context;
        _probabilityEngine = probabilityEngine;
    }

    public async Task<PackResultDto> OpenPackAsync(Guid userId)
    {
        // 1. Validate User and Balance
        var user = await _context.Users.FindAsync(userId);
        if (user == null)
            throw new Exception("User not found.");

        if (user.Coins < PackCost)
            throw new Exception("Insufficient coins to purchase a pack.");

        // 2. Deduct Cost
        user.Coins -= PackCost;

        // 3. Generate Cards
        var allCards = await _context.Cards.ToListAsync();
        if (!allCards.Any())
            throw new Exception("No cards available in the database.");

        var wonCards = _probabilityEngine.GeneratePack(allCards);

        // 4. Create Pack Record
        var pack = new Pack
        {
            UserId = userId,
            Cost = PackCost,
            CreatedAt = DateTime.UtcNow
        };

        _context.Packs.Add(pack);

        // 5. Add winnings to user
        decimal totalWon = 0;
        int index = 1;
        foreach (var card in wonCards)
        {
            totalWon += card.Value;
            _context.PackCards.Add(new PackCard
            {
                PackId = pack.PackId,
                CardId = card.CardId,
                SlotIndex = index++
            });
        }

        user.Coins += totalWon;

        // 6. Save to Database
        await _context.SaveChangesAsync();

        // 7. Return Result
        return new PackResultDto
        {
            PackId = pack.PackId,
            TotalWon = totalWon,
            NewBalance = user.Coins,
            Cards = wonCards.Select(c => new CardDto
            {
                CardId = c.CardId,
                CardName = c.CardName,
                Value = c.Value,
                Rarity = (int)c.Rarity
            }).ToList()
        };
    }
}
