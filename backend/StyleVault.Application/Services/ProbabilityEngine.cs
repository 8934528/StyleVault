using StyleVault.Domain.Entities;
using StyleVault.Domain.Enums;

namespace StyleVault.Application.Services;

public class ProbabilityEngine
{
    private readonly Random _random = new();

    public List<Card> GeneratePack(List<Card> allCards)
    {
        var resultPacks = new List<Card>();

        // Separate cards by rarity for slot rules
        var commonCards = allCards.Where(c => c.Rarity == CardRarity.Common).ToList();
        var midCards = allCards.Where(c => c.Rarity == CardRarity.Mid).ToList();
        var allExceptJackpot = allCards.Where(c => c.Rarity != CardRarity.Jackpot).ToList();

        // Slot 1: Always Common
        resultPacks.Add(RollCard(commonCards));

        // Slot 2: Common or Mid
        var slot2Pool = new List<Card>(commonCards);
        slot2Pool.AddRange(midCards);
        resultPacks.Add(RollCard(slot2Pool));

        // Slot 3: Any 
        resultPacks.Add(RollCard(allCards));

        return resultPacks;
    }

    private Card RollCard(List<Card> pool)
    {
        double totalProbability = pool.Sum(c => c.Probability);
        double roll = _random.NextDouble() * totalProbability;

        double cumulative = 0.0;
        foreach (var card in pool)
        {
            cumulative += card.Probability;
            if (roll <= cumulative)
            {
                return card;
            }
        }

        // Fallback
        return pool.First();
    }
}
