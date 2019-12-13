FROM openjdk:11

ENV EUREKA_CLIENT_SERVICEURL_DEFAULTZONE="" \
  SPRING_DATASOURCE_URL="" \
  SPRING_DATASOURCE_USERNAME="" \
  SPRING_DATASOURCE_PASSWORD="" \
  OAUTHSERVICE_URL=''

ADD *.jar /app.jar

EXPOSE 8080

CMD java -jar /app.jar \
  --server.port=8080 \
  --spring.datasource.url="${SPRING_DATASOURCE_URL}" \
  --spring.datasource.username="${SPRING_DATASOURCE_USERNAME}" \
  --spring.datasource.password="${SPRING_DATASOURCE_PASSWORD}" \
  --eureka.client.service-url.defaultZone="${EUREKA_CLIENT_SERVICEURL_DEFAULTZONE}" \
  --application.oauth.client-url="${OAUTHSERVICE_URL}"
