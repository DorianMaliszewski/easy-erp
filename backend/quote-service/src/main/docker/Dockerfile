FROM openjdk:11

RUN apt-get update \
    && apt-get install -y \
        curl \
        libxrender1 \
        libfontconfig \
        libxtst6 \
        xz-utils

RUN curl "https://downloads.wkhtmltopdf.org/0.12/0.12.4/wkhtmltox-0.12.4_linux-generic-amd64.tar.xz" -L -o "wkhtmltopdf.tar.xz"
RUN tar Jxvf wkhtmltopdf.tar.xz
RUN mv wkhtmltox/bin/wkhtmltopdf /usr/local/bin/wkhtmltopdf

ENV SPRING_DATASOURCE_URL="" \
  SPRING_DATASOURCE_USERNAME="" \
  SPRING_DATASOURCE_PASSWORD="" \
  OAUTHSERVICE_URL='' \
  EASY_ERP_FILE_DIRECTORY='/tmp'

ADD *.jar /app.jar

EXPOSE 8080

CMD java -jar /app.jar \
  --server.port=8080 \
  --spring.datasource.url="${SPRING_DATASOURCE_URL}" \
  --spring.datasource.username="${SPRING_DATASOURCE_USERNAME}" \
  --spring.datasource.password="${SPRING_DATASOURCE_PASSWORD}" \
  --application.oauth.client-url="${OAUTHSERVICE_URL}" \
  --easy-erp.fileDirectory="${EASY_ERP_FILE_DIRECTORY}"
