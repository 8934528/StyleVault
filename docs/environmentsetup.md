# Environment & Setup Guide

Welcome to the **StyleVault** project! Follow this guide to jump quickly into development.

## Requirements

- Docker Desktop
- .NET 8 SDK
- Node.js (v18+)

## 1. Quick Start using the Root Makefile

We've established a root `Makefile` to run the multi-tiered ecosystem with single commands.

- `make init` -> Restores backend NuGet packages and runs `npm install` for frontend.
- `make run-db` -> Boots strictly the PostgreSQL database via Docker.
- `make run-all` -> Compiles and runs the DB, API, and Web containers simultaneously via Docker Compose.

## 2. Manual Execution (Outside Docker)

If you wish to debug via standard terminals:

1. Load your `.env` variables from `backend/.env`. (Ensure the credentials match your local postgres instance, or just use the docker-compose DB!).
2. In `backend/` run: `dotnet run --project StyleVault.API`
3. In `frontend/` run: `npm run dev`

## Troubleshooting

- If EF Core fails to match the database schemas, run `dotnet ef database update` inside the `backend` folder to manually sync the `AppDbContext`.
