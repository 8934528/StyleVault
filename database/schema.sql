CREATE TABLE "Users" (
    "UserId" uuid PRIMARY KEY NOT NULL,
    "Username" text NOT NULL,
    "Coins" numeric NOT NULL
);

CREATE TABLE "Cards" (
    "CardId" uuid PRIMARY KEY NOT NULL,
    "CardNumber" integer NOT NULL UNIQUE,
    "CardName" text NOT NULL,
    "Value" numeric NOT NULL,
    "Probability" double precision NOT NULL,
    "Rarity" integer NOT NULL
);

CREATE TABLE "Packs" (
    "PackId" uuid PRIMARY KEY NOT NULL,
    "UserId" uuid NOT NULL REFERENCES "Users" ("UserId") ON DELETE CASCADE,
    "Cost" numeric NOT NULL,
    "CreatedAt" timestamp with time zone NOT NULL
);

CREATE TABLE "PackCards" (
    "PackCardId" uuid PRIMARY KEY NOT NULL,
    "PackId" uuid NOT NULL REFERENCES "Packs" ("PackId") ON DELETE CASCADE,
    "CardId" uuid NOT NULL REFERENCES "Cards" ("CardId") ON DELETE RESTRICT,
    "SlotIndex" integer NOT NULL
);
