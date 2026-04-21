using Microsoft.EntityFrameworkCore;
using Npgsql;
using System.Data.Common;
using Microsoft.Data.Sqlite;
using StyleVault.Domain.Entities;
using StyleVault.Domain.Enums;

namespace StyleVault.Infrastructure.Data;

public static class DbInitializer
{
    public static async Task InitializeAsync(AppDbContext context)
    {
        Console.WriteLine("Starting database initialization...");
        // 1. Ensure the database exists (PostgreSQL)
        try 
        {
            await EnsureDatabaseExistsAsync(context);
            Console.WriteLine("Database check/creation completed.");
        }
        catch (Exception ex)
        {
            Console.WriteLine($"Error during Database creation check: {ex.Message}");
        }

        // 2. tables if they don't exist
        try
        {
            await CreateTablesIfNotExistsAsync(context);
            Console.WriteLine("Table check/creation completed.");
        }
        catch (Exception ex)
        {
            Console.WriteLine($"Error during Table creation: {ex.Message}");
        }

        // 3. Seed data (users & cards)
        try
        {
            await SeedDataAsync(context);
            Console.WriteLine("Data seeding completed.");
        }
        catch (Exception ex)
        {
            Console.WriteLine($"Error during Seeding: {ex.Message}");
        }
    }

    private static async Task EnsureDatabaseExistsAsync(AppDbContext context)
    {
        var connection = context.Database.GetDbConnection();
        var connectionString = connection.ConnectionString;

        if (connection is NpgsqlConnection)
        {
            var builder = new NpgsqlConnectionStringBuilder(connectionString);
            var databaseName = builder.Database;
            builder.Database = "postgres"; // Connect to default 'postgres' DB to check/create target DB
            using var adminConnection = new NpgsqlConnection(builder.ToString());
            await adminConnection.OpenAsync();

            bool dbExists = false;
            using (var cmd = new NpgsqlCommand($"SELECT 1 FROM pg_database WHERE datname = '{databaseName}'", adminConnection))
            using (var reader = await cmd.ExecuteReaderAsync())
            {
                dbExists = reader.HasRows;
            }

            if (!dbExists)
            {
                using var createCmd = new NpgsqlCommand($"CREATE DATABASE \"{databaseName}\"", adminConnection);
                await createCmd.ExecuteNonQueryAsync();
            }
        }
    }

    private static async Task CreateTablesIfNotExistsAsync(AppDbContext context)
    {
        var connection = context.Database.GetDbConnection();
        await connection.OpenAsync();

        // SQL statements
        string createUsersTable = @"
            CREATE TABLE IF NOT EXISTS ""Users"" (
                ""UserId"" uuid PRIMARY KEY,
                ""Username"" text NOT NULL,
                ""Coins"" numeric NOT NULL
            );";

        string createCardsTable = @"
            CREATE TABLE IF NOT EXISTS ""Cards"" (
                ""CardId"" uuid PRIMARY KEY,
                ""CardNumber"" integer NOT NULL UNIQUE,
                ""CardName"" text NOT NULL,
                ""Value"" numeric NOT NULL,
                ""Probability"" double precision NOT NULL,
                ""Rarity"" integer NOT NULL
            );";

        string createPacksTable = @"
            CREATE TABLE IF NOT EXISTS ""Packs"" (
                ""PackId"" uuid PRIMARY KEY,
                ""UserId"" uuid NOT NULL,
                ""Cost"" numeric NOT NULL,
                ""CreatedAt"" timestamp with time zone NOT NULL,
                FOREIGN KEY (""UserId"") REFERENCES ""Users""(""UserId"") ON DELETE CASCADE
            );";

        string createPackCardsTable = @"
            CREATE TABLE IF NOT EXISTS ""PackCards"" (
                ""PackCardId"" uuid PRIMARY KEY,
                ""PackId"" uuid NOT NULL,
                ""CardId"" uuid NOT NULL,
                ""SlotIndex"" integer NOT NULL,
                FOREIGN KEY (""PackId"") REFERENCES ""Packs""(""PackId"") ON DELETE CASCADE,
                FOREIGN KEY (""CardId"") REFERENCES ""Cards""(""CardId"") ON DELETE RESTRICT
            );";

        using (var cmd = connection.CreateCommand())
        {
            cmd.CommandText = createUsersTable;
            await cmd.ExecuteNonQueryAsync();
            cmd.CommandText = createCardsTable;
            await cmd.ExecuteNonQueryAsync();
            cmd.CommandText = createPacksTable;
            await cmd.ExecuteNonQueryAsync();
            cmd.CommandText = createPackCardsTable;
            await cmd.ExecuteNonQueryAsync();
        }
    }

    private static async Task SeedDataAsync(AppDbContext context)
    {
        // Seed default user if none exist
        if (!await context.Users.AnyAsync())
        {
            context.Users.Add(new User
            {
                UserId = Guid.Parse("00000000-0000-0000-0000-000000000000"),
                Username = "TestPlayer",
                Coins = 100
            });
            await context.SaveChangesAsync();
        }

        // Seed cards if none exist
        if (!await context.Cards.AnyAsync())
        {
            var cards = new List<Card>
            {
                new Card { CardId = Guid.NewGuid(), CardNumber = 1000, CardName = "Empty", Value = 0, Probability = 40.0, Rarity = CardRarity.Common },
                new Card { CardId = Guid.NewGuid(), CardNumber = 1001, CardName = "Low 5", Value = 5, Probability = 20.0, Rarity = CardRarity.Common },
                new Card { CardId = Guid.NewGuid(), CardNumber = 1002, CardName = "Low 7", Value = 7, Probability = 15.0, Rarity = CardRarity.Common },
                new Card { CardId = Guid.NewGuid(), CardNumber = 1003, CardName = "Low 9", Value = 9, Probability = 10.0, Rarity = CardRarity.Common },
                new Card { CardId = Guid.NewGuid(), CardNumber = 1004, CardName = "Low 11", Value = 11, Probability = 7.0, Rarity = CardRarity.Common },
                new Card { CardId = Guid.NewGuid(), CardNumber = 2001, CardName = "Card 360", Value = 25, Probability = 5.0, Rarity = CardRarity.Mid },
                new Card { CardId = Guid.NewGuid(), CardNumber = 2002, CardName = "Card 2", Value = 35, Probability = 2.0, Rarity = CardRarity.Mid },
                new Card { CardId = Guid.NewGuid(), CardNumber = 3001, CardName = "Card ZAR", Value = 45, Probability = 0.8, Rarity = CardRarity.Rare },
                new Card { CardId = Guid.NewGuid(), CardNumber = 4001, CardName = "StyleVault Game Card", Value = 70, Probability = 0.2, Rarity = CardRarity.Jackpot }
            };
            context.Cards.AddRange(cards);
            await context.SaveChangesAsync();
        }
    }
}
