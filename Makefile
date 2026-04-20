.PHONY: all help init run-db run-api run-web run-all test clean

help:
	@echo "StyleVault Makefile Commands:"
	@echo "  make check-versions - Check if node and dotnet are installed"
	@echo "  make init      - Install dependencies for both frontend and backend"
	@echo "  make run-db    - Start PostgreSQL database via Docker Compose"
	@echo "  make run-api   - Run ASP.NET Core API locally"
	@echo "  make run-web   - Run Vite React frontend locally"
	@echo "  make run-all   - Run complete stack (checks versions, restore, install, run parallel)"
	@echo "  make test      - Run all backend unit and integration tests"
	@echo "  make clean     - Remove bin/obj and node_modules"

check-versions:
	@echo "Checking required versions..."
	@node --version >/dev/null 2>&1 || (echo "Node.js is not installed!" && exit 1)
	@npm --version >/dev/null 2>&1 || (echo "npm is not installed!" && exit 1)
	@dotnet --version >/dev/null 2>&1 || (echo "dotnet is not installed!" && exit 1)
	@echo "All required tools are installed."

init: check-versions
	cd frontend && npm install
	cd backend && dotnet restore

run-db:
	docker-compose up -d db

run-api:
	cd backend/StyleVault.API && dotnet run

run-web:
	cd frontend && npm run dev

run-all: init
	@echo "Starting Database..."
	docker-compose up -d db
	@echo "Starting API and Web (Press Ctrl+C to stop)..."
	# Using parallel background process for API
	cd backend/StyleVault.API && dotnet run & cd frontend && npm run dev

test:
	cd backend && dotnet test

clean:
	cd backend && dotnet clean
	cd frontend && rm -rf node_modules package-lock.json
