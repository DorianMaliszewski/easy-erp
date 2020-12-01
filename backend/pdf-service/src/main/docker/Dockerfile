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
RUN mkdir /templates
RUN mkdir /data
RUN ls -la

ADD *.jar /app.jar

ADD classes/templates/* /templates/

EXPOSE 8080
VOLUME ["/data", "/templates"]

CMD java -jar /app.jar \
  --server.port=8080 \
  --spring.thymeleaf.prefix=/templates/ \
  --easy-erp.file-directory=/data
