.PHONY: all help init run-db run-api run-web run-all test clean

help:
	@echo "StyleVault Makefile Commands:"
	@echo "  make init      - Install dependencies for both frontend and backend"
	@echo "  make run-db    - Start PostgreSQL database via Docker Compose"
	@echo "  make run-api   - Run ASP.NET Core API locally"
	@echo "  make run-web   - Run Vite React frontend locally"
	@echo "  make run-all   - Run complete stack via Docker Compose"
	@echo "  make test      - Run all backend unit and integration tests"
	@echo "  make clean     - Remove bin/obj and node_modules"

init:
	cd frontend && npm install
	cd backend && dotnet restore

run-db:
	docker-compose up -d db

run-api:
	cd backend/StyleVault.API && dotnet run

run-web:
	cd frontend && npm run dev

run-all:
	docker-compose up --build

test:
	cd backend && dotnet test

clean:
	cd backend && dotnet clean
	cd frontend && rm -rf node_modules package-lock.json
