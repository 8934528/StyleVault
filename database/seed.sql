INSERT INTO "Users" ("UserId", "Username", "Coins") VALUES 
('00000000-0000-0000-0000-000000000000', 'TestPlayer', 100.0);

INSERT INTO "Cards" ("CardId", "CardNumber", "CardName", "Value", "Probability", "Rarity") VALUES 
(gen_random_uuid(), 1000, 'Empty', 0, 40.0, 1),
(gen_random_uuid(), 1001, 'Low 5', 5, 20.0, 1),
(gen_random_uuid(), 1002, 'Low 7', 7, 15.0, 1),
(gen_random_uuid(), 1003, 'Low 9', 9, 10.0, 1),
(gen_random_uuid(), 1004, 'Low 11', 11, 7.0, 1),
(gen_random_uuid(), 2001, 'Card 360', 25, 5.0, 2),
(gen_random_uuid(), 2002, 'Card 2', 35, 2.0, 2),
(gen_random_uuid(), 3001, 'Card ZAR', 45, 0.8, 3),
(gen_random_uuid(), 4001, 'StyleVault Game Card', 70, 0.2, 4);
