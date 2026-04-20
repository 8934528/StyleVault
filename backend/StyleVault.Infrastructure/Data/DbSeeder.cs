using StyleVault.Domain.Entities;
using StyleVault.Domain.Enums;

namespace StyleVault.Infrastructure.Data;

public static class DbSeeder
{
    public static void SeedCards(AppDbContext context)
    {
        if (context.Cards.Any()) return; // DB has been seeded

        var cards = new List<Card>
        {
            // Common Cards
            new Card { CardNumber = 1000, CardName = "Empty", Value = 0, Probability = 40.0, Rarity = CardRarity.Common },
            new Card { CardNumber = 1001, CardName = "Low 5", Value = 5, Probability = 20.0, Rarity = CardRarity.Common },
            new Card { CardNumber = 1002, CardName = "Low 7", Value = 7, Probability = 15.0, Rarity = CardRarity.Common },
            new Card { CardNumber = 1003, CardName = "Low 9", Value = 9, Probability = 10.0, Rarity = CardRarity.Common },
            new Card { CardNumber = 1004, CardName = "Low 11", Value = 11, Probability = 7.0, Rarity = CardRarity.Common },
            
            // Mid Tier Cards
            new Card { CardNumber = 2001, CardName = "Card 360", Value = 25, Probability = 5.0, Rarity = CardRarity.Mid },
            new Card { CardNumber = 2002, CardName = "Card 2", Value = 35, Probability = 2.0, Rarity = CardRarity.Mid },
            
            // Rare / Jackpot Tier Cards
            new Card { CardNumber = 3001, CardName = "Card ZAR", Value = 45, Probability = 0.8, Rarity = CardRarity.Rare },
            new Card { CardNumber = 4001, CardName = "StyleVault Game Card", Value = 70, Probability = 0.2, Rarity = CardRarity.Jackpot }
        };

        context.Cards.AddRange(cards);
        
        if (!context.Users.Any())
        {
            context.Users.Add(new User 
            { 
               Username = "TestPlayer", 
               Coins = 100m 
            });
        }
        
        context.SaveChanges();
    }
}
