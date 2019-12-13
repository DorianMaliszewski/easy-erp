#!/bin/bash
for dir in ./*/
do
  cd $dir;
  echo -ne "Building $dir ...";
  ./mvnw package docker:build -DskipTests > ../build.log;
  if [ $? != 0 ] ; then
    echo -e "\033[0;31m error \033[0m \n Une erreur est survenue lors de la compilation du projet dans $dir ";
    exit 1;
  fi;
  echo -e "\033[0;32m built \033[0m";
  cd ../;
done;
# cd ./eureka-server && ./mvnw package docker:build -DskipTests && cd ../hello-service && ./mvnw package docker:build -DskipTests && cd ../post-service && ./mvnw package docker:build -DskipTests && cd ../zuul && ./mvnw package docker:build -DskipTests && cd ../