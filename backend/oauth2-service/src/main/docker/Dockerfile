FROM openjdk:11

ENV SPRING_OUTPUT_ANSI_ENABLED=ALWAYS \
       TIME_TO_SLEEP=0 \
       JAVA_OPTS="" \
       SPRING_DATASOURCE_URL="" \
       SPRING_DATASOURCE_USER="" \
       SPRING_DATASOURCE_PASSWORD="" \
       BASE_URL="" \
       MAIL_HOST="" \
       MAIL_PORT="" \
       MAIL_USERNAME="" \
       MAIL_PASSWORD="" \
       MAIL_AUTH="" \
       MAIL_TLS=""

ADD *.jar /app.jar

EXPOSE 8080

CMD echo "The application will start in ${TIME_TO_SLEEP}s..." && \
       sleep ${TIME_TO_SLEEP} && \
       java -jar /app.jar \
       --server.port=8080 \
       --spring.datasource.url="${SPRING_DATASOURCE_URL}" \
       --spring.datasource.username="${SPRING_DATASOURCE_USERNAME}" \
       --spring.datasource.password="${SPRING_DATASOURCE_PASSWORD}" \
       --application.base-url="${BASE_URL}" \
       --spring.mail.host="${MAIL_HOST}" \
       --spring.mail.port="${MAIL_PORT}" \
       --spring.mail.username="${MAIL_USERNAME}" \
       --spring.mail.password="${MAIL_PASSWORD}" \
       --spring.mail.properties.mail.smtp.auth="${MAIL_AUTH}" \
       --spring.mail.properties.mail.smtp.starttls.enable="${MAIL_TLS}"
