#!/usr/bin/bash

git pull origin master:master && \
if [ "$1" == "build" ]; then
    docker-compose -f ./docker-compose.yml -f ./docker-compose.override.yml build namie_cc_web_service
elif [ "$1" == "up" ]; then
    docker-compose -f ./docker-compose.yml -f ./docker-compose.override.yml up -d --build --scale namie_cc_web_service=2 namie_cc_web_service
elif [ "$1" == "recreate" ]; then
    docker-compose -f ./docker-compose.yml -f ./docker-compose.override.yml up -d --build --force-recreate --scale namie_cc_web_service=2 namie_cc_web_service
elif [ "$1" == "restart" ]; then
    docker-compose -f ./docker-compose.yml -f ./docker-compose.override.yml restart namie_cc_web_service
elif [ "$1" == "stop" ]; then
    docker-compose -f ./docker-compose.yml -f ./docker-compose.override.yml stop namie_cc_web_service
elif [ "$1" == "rm" ]; then
    docker-compose -f ./docker-compose.yml -f ./docker-compose.override.yml rm -s -f namie_cc_web_service
elif [ "$1" == "logs" ]; then
    docker-compose -f ./docker-compose.yml -f ./docker-compose.override.yml logs namie_cc_web_service
else
    echo "Unexpected parameter: $1"
fi

docker rmi $(docker images -f "dangling=true" -q)

if [ "$1" == "up" ]; then
    sleep 10 && docker ps
fi
