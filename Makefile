build:
	docker compose build --no-cache

up:
	docker compose up -d

down:
	docker compose down

fix:
	npm run lint-fix

format:
	npm run format
