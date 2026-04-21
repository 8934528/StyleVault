using Microsoft.EntityFrameworkCore;
using StyleVault.Application.DTOs;
using StyleVault.Application.Interfaces;
using StyleVault.Domain.Entities;

namespace StyleVault.Application.Services;

public class PackService(IAppDbContext context, ProbabilityEngine probabilityEngine) : IPackService
{
    private const decimal PackCost = 20m;

    public async Task<PackResultDto> OpenPackAsync(Guid userId)
    {
        // 1. Validate User and Balance
        var user = await context.Users.FindAsync(userId);
        if (user is null)
            throw new Exception("User not found.");

        if (user.Coins < PackCost)
            throw new Exception("Insufficient coins to purchase a pack.");

        // 2. Deduct Cost
        user.Coins -= PackCost;

        // 3. Generate Cards
        var allCards = await context.Cards.ToListAsync();
        if (allCards.Count == 0)
            throw new Exception("No cards available in the database.");

        var wonCards = probabilityEngine.GeneratePack(allCards);

        // 4. Create Pack Record
        var pack = new Pack
        {
            UserId = userId,
            Cost = PackCost,
            CreatedAt = DateTime.UtcNow
        };

        context.Packs.Add(pack);

        // 5. Add winnings to user
        decimal totalWon = 0;
        int index = 1;
        foreach (var card in wonCards)
        {
            totalWon += card.Value;
            context.PackCards.Add(new PackCard
            {
                PackId = pack.PackId,
                CardId = card.CardId,
                SlotIndex = index++
            });
        }

        user.Coins += totalWon;

        // 6. Save to Database
        await context.SaveChangesAsync();

        // 7. Return Result
        return new PackResultDto
        {
            PackId = pack.PackId,
            TotalWon = totalWon,
            NewBalance = user.Coins,
            Cards = [.. wonCards.Select(c => new CardDto
            {
                CardId = c.CardId,
                CardName = c.CardName,
                Value = c.Value,
                Rarity = (int)c.Rarity
            })]
        };
    }

    public async Task<IEnumerable<PackHistoryDto>> GetUserHistoryAsync(Guid userId)
    {
        var packs = await context.Packs
            .Where(p => p.UserId == userId)
            .Include(p => p.PackCards)
                .ThenInclude(pc => pc.Card)
            .OrderByDescending(p => p.CreatedAt)
            .ToListAsync();

        return packs.Select(p => new PackHistoryDto
        {
            PackId = p.PackId,
            CreatedAt = p.CreatedAt,
            Cost = p.Cost,
            TotalWon = p.PackCards.Sum(pc => pc.Card?.Value ?? 0),
            Cards = [.. p.PackCards.OrderBy(pc => pc.SlotIndex).Select(pc => new CardDto
            {
                CardId = pc.CardId,
                CardName = pc.Card?.CardName ?? "Unknown",
                Value = pc.Card?.Value ?? 0,
                Rarity = (int)(pc.Card?.Rarity ?? 0)
            })]
        });
    }
}
