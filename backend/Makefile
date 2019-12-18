build-and-launch:
	./create-all-image.sh && ./launch-stack.sh

build:
	./create-all-image.sh

launch:
	./launch-stack.sh

build-bill-service:
	cd bill-service && ./mvnw clean package docker:build -DskipTests

build-quote-service:
	cd quote-service && ./mvnw clean package docker:build -DskipTests

build-client-service:
	cd client-service && ./mvnw clean package docker:build -DskipTests

build-oauth-service:
	cd oauth2-authorization-server && ./mvnw clean package docker:build -DskipTests
