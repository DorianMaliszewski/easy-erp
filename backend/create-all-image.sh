#!/bin/bash
for dir in ./*-service/
do
  cd $dir;
  echo -ne "Building $dir ...";
  ./mvnw clean package docker:build -DskipTests > ../build.log;
  if [ $? != 0 ] ; then
    echo -e "\033[0;31m error \033[0m \n Une erreur est survenue lors de la compilation du projet dans $dir ";
    exit 1;
  fi;
  echo -e "\033[0;32m built \033[0m";
  cd ../;
done;
