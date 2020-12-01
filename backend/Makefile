build-and-launch:
	./create-all-image.sh && ./launch-stack.sh

build:
	./create-all-image.sh

launch:
	./launch-stack.sh

dc-logs:
	docker-compose logs -f

dc-up:
	docker-compose -d

dc-start:
	docker-compose start

dc-stop:
	docker-compose stop

dc-down:
	docker-compose down

build-bill-service:
	cd bill-service && ./mvnw clean package docker:build -DskipTests

build-quote-service:
	cd quote-service && ./mvnw clean package docker:build -DskipTests

build-client-service:
	cd client-service && ./mvnw clean package docker:build -DskipTests

build-oauth-service:
	cd oauth2-authorization-server && ./mvnw clean package docker:build -DskipTests

build-pdf-service:
	cd pdf-service && ./mvnw clean package docker:build -DskipTests
