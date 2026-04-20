# StyleVault

![C# 12](https://img.shields.io/badge/C%23-12-blue.svg)
![ASP.NET Core 8](https://img.shields.io/badge/ASP.NET%20Core-8.0-blue.svg)
![EF Core](https://img.shields.io/badge/EF%20Core-8.0-blue.svg)
![React](https://img.shields.io/badge/React-18-blue.svg)
![Vite](https://img.shields.io/badge/Vite-5-purple.svg)
![Bootstrap](https://img.shields.io/badge/Bootstrap-5.3-purple.svg)
![SQLite](https://img.shields.io/badge/SQLite-3-blue.svg)
---
**StyleVault** is an interactive, progressive card-opening web game featuring an expansive, controlled RTP (Return To Player) model with stunning UI/UX and dynamic animations.

In StyleVault, players can purchase packs using in-game currency. Each pack contains exactly 3 cards, dropping randomized visual elements and varying value returns.

---

## Core Gameplay

- **Pack Price**: 20 Rands
- **Cards Per Pack**: 3 Cards
- **Currencies**: Zar (in-game virtual currency)

## Card Value and Tier List

Cards are divided into categories based on their rarity and payout value. Higher-valued cards have significantly lower drop rates, dynamically scaled by the platform's probability engine to maintain balanced game economy.

| Card Rarity / Tier | Target Drop Value | Description |
|--------------------|-------------------|-------------|
| **Common (Low)**   | 0 Rands           | "No Value" cards. Highly common pulls with no monetary return. |
| **Uncommon**       | 5 - 11 Rands      | Standard reward cards, providing small to moderate value returns. |
| **Rare (Special)** | 25 Rands          | Ex: "Card 360". Specialized card with a high drop return. |
| **Epic (Special)** | 35 Rands          | Ex: "Card 2". Exciting drops with a premium return. |
| **Legendary**      | 45 Rands          | Ex: "Card Zar". Highly valuable item drop. |
| **Mythic (Ultra)** | 70 Rands          | Ex: "StyleVault Card". The pinnacle drop—extremely rare. |

---

## Game Mechanics

- **Probability System**: Dynamic outcome combinations ensure that lower-value cards appear frequently, while valuable (Epic, Legendary, Mythic) cards trigger rare events.

- **RTP Deductions**: A complex mathematical calculation applies probability weighting based on current combinations.

- **Controlled System**: Rigorous limits prevent extreme exploitation.

---
