#!/usr/bin/bash


if [ "$1" == "build" ]; then
    docker-compose -f ./docker-compose.yml build www_namie_cc
elif [ "$1" == "up" ]; then
    docker-compose -f ./docker-compose.yml up -d --scale www_namie_cc=2 www_namie_cc
elif [ "$1" == "recreate" ]; then
    docker-compose -f ./docker-compose.yml up -d --scale www_namie_cc=2 --build --force-recreate www_namie_cc
elif [ "$1" == "restart" ]; then
    docker-compose -f ./docker-compose.yml restart www_namie_cc
elif [ "$1" == "stop" ]; then
    docker-compose -f ./docker-compose.yml stop www_namie_cc
elif [ "$1" == "rm" ]; then
    docker-compose -f ./docker-compose.yml rm www_namie_cc
elif [ "$1" == "static" ]; then
    echo "Deploy static files."
else
    echo "Unexpected parameter: $1"
fi

docker rmi $(docker images -f "dangling=true" -q)
