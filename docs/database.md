# Database Schema & Structure

StyleVault relies on **PostgreSQL** configured via **Entity Framework Core**.

## Schema Hierarchy

1. **Users Table**
   - Tracks unique `UserId` and real-time fake `Coins` balance.

2. **Cards Table**
   - Dictates the complete available card pool. Fields: `CardNumber` (Unique Index), `CardName`, `Value` (Payout), `Probability` (%), and `Rarity`.

3. **Packs Table**
   - Keeps telemetry on every pack fully opened, who opened it (`UserId`), and at what cost.

4. **PackCards Table**
   - The relational mappings connecting 3 unique `CardId` rows to a specific `PackId`, capturing the `SlotIndex` (1, 2, or 3) indicating exactly how the animation played out for that user.

## Seeding

On first startup, the `DbSeeder` class manually injects exactly 9 Card types that fulfill the exact specifications:

- 5x Common Cards (Including "Empty")
- 2x Mid Tier Cards ("Card 360", "Card 2")
- 2x Rare/Jackpot Cards ("Card ZAR", "StyleVault Game Card")
