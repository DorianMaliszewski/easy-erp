FROM openjdk:11

ENV SPRING_DATASOURCE_URL="" \
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
  --security.oauth2.resource.token-info-uri="${OAUTHSERVICE_URL}"
