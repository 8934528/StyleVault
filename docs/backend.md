# Backend Technical Design

The `StyleVault` backend is constructed using **ASP.NET Core Web API**, built on standard clean architecture paradigms.

## Architecture Tiers

1. **API Layer (`StyleVault.API`)**: Receives the HTTP requests, routes them to `Services`. Contains `Program.cs` for DI setup, and `Controllers` for standard routing.

2. **Application Layer (`StyleVault.Application`)**: Contains `Interfaces` and `Services`. The core piece is `ProbabilityEngine.cs` which manages the RTP calculations for opening packs.

3. **Domain Layer (`StyleVault.Domain`)**: POCO objects (Entities like `User`, `Card`, `Pack`, `PackCard`) and constants/enums. Fully isolated.

4. **Infrastructure Layer (`StyleVault.Infrastructure`)**: Entity Framework Core DbContext, Repositories, Migrations, and `DbSeeder`.

## Probability Engine Mechanics

To satisfy the 70% RTP over a R20 pack cost, the engine employs a "guaranteed tier" mechanic:

- **Slot 1**: Fixed pull from Common rarity (Values 0 - 11).
- **Slot 2**: Constrained to Common or Mid rarity (Values 0 - 35).
- **Slot 3**: Unconstrained wildcard slot allowing Jackpot (R70). Maximum 1 Jackpot per pack mathematically forced by ensuring Slot 1/2 cannot hit it.

This implementation effectively mitigates wild player variance and stops edge cases from ruining the game's economy.

## Controllers

- **PackController**: `POST /api/pack/open?userId={id}` -> Uses the `PackService` to deduct cost, generate cards, update balances, and commit to DB in one transaction scope.
- **UserController**: `GET /api/user/{id}/balance`
- **CardsController**: Exposes card rarities and odds publicly to satisfy transparency requirements for such games.
