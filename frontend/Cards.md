# Game Cards NAMES

1. ZERO VALUE CARDS (VERY COMMON)

These drive your RTP balance.

- Value: R0
- Empty Vault
- Broken Key
- Dust Coin
- Faded Token
- Rust Plate
- Cracked Coin
- Lost Ticket
- Fake ZAR
- Blank Card
- Shadow Card

You can easily expand these to 20–50 variations later.

2. LOW-TIER CARDS (COMMON)

Value Range: R5 – R11

- R5 Cards

	Bronze Coin
	Street Token
	Mini ZAR
	Pocket Change
	Rusty Rand

- R7 Cards

	Silver Chip
	Lucky 7 Coin
	Urban Token
	Street Silver
	Quick Rand

- R9 Cards

	Gold Spark
	Vault Piece
	Treasure Bit
	Golden Edge
	Rich Token

- R11 Cards

	Mini Vault
	Gold Chip
	Lucky Gold
	Treasure Drop
	Vault Spark

3. MID-TIER SPECIAL CARDS

These start to feel exciting.

- Card 360 → R25

	- Card 360 Alpha
	- Card 360 Prime
	- Card 360 Edge
	- Card 360 Core
	- Card 360 Pulse

- Card 2 → R35

	- Card 2 Classic
	- Card 2 Power
	- Card 2 Elite
	- Card 2 Strike
	- Card 2 Nova

4. HIGH-TIER RARE CARDS

These are your dopamine drivers.

- Card ZAR → R45

	- ZAR King
	- ZAR Titan
	- ZAR Crown
	- ZAR Master
	- ZAR Phantom

- JACKPOT CARD → R70

Vault Core
Vault Omega
Vault Infinity
Vault Genesis
Vault Supreme

5. TOTAL CARD COUNT (Current)

- Zero cards → 10
- Low-tier → 20
- Mid-tier → 10
- High-tier → 10

Total: 50 cards

6. CARD STRUCTURE (IMPORTANT)

Every card in your DB should look like:

	{
	  "CardId": "UUID",
	  "CardNumber": 10001,
	  "CardName": "ZAR King",
	  "Value": 45,
	  "Rarity": "Rare",
	  "Probability": 0.8
	}

## TIP

Probability -> tied to Tier
Names -> just variations inside tier

This lets you:

- Add new cards anytime
- Keep math stable
- Avoid breaking RTP

## FUTURE EXPANSION (VERY IMPORTANT)

Later you can add:

`**Event Cards**

- “Heritage ZAR”
- “Mzansi Gold”

`**Seasonal Packs**

- Christmas Vault
- Summer Rush

`**Ultra Rare (0.05%)**

- Black ZAR
- Shadow Vault
