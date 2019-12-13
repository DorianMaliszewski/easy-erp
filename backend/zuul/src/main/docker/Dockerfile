FROM openjdk:11

ENV SPRING_OUTPUT_ANSI_ENABLED=ALWAYS \
  TIME_TO_SLEEP=0 \
  JAVA_OPTS="" \
  BASE_URL="" \
  EUREKA_CLIENT_SERVICEURL_DEFAULTZONE=""

ADD *.jar /app.jar

EXPOSE 8080

CMD echo "The application will start in ${TIME_TO_SLEEP}s..." && \
  sleep ${TIME_TO_SLEEP} && \
  java -jar /app.jar \
  --server.port=8080 \
  --application.base-url="${BASE_URL}" \
  --eureka.client.service-url.defaultZone="${EUREKA_CLIENT_SERVICEURL_DEFAULTZONE}"