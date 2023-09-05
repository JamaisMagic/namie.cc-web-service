# An url shortener written in python

## Environment

Docker, Docker compose, python 3.11, mysql 8, redis 7

## Get started

* Install Docker and Docker compose. For installing docker and docker compose, visit the [Docker official website](https://docs.docker.com/install/).
* Run mysql server from this repo: [docker-mysql](https://github.com/JamaisMagic/docker-mysql)
* Run redis server from this repo: [docker-redis](https://github.com/JamaisMagic/docker-redis)

### Run the following commands to start the service

```bash
bash ./run-docker[-dev].sh build # For build the image.
bash ./run-docker[-dev].sh up # For start the containers.
```

## supervisor 3.3.1 (Deprecated)

Supervisor is removed, use Docker instead.

## Auto run when reboot on ubuntu 16.04 (Deprecated, use docker instead.)

```bash
sudo crontab -e
# then add this line to the bottom of the file
@reboot sudo supervisord -c /data/app/namie.cc/supervisord.conf
```

## If you find something wrong with https or ipv6 conf, see [this article](https://chrisjean.com/fix-nginx-emerg-bind-to-80-failed-98-address-already-in-use/) may help you

> Using ipv6only=on ensures that the IPv6 listen directive will only bind to IPv6 and not automatically to IPv4 as well.

## Website

* [www.namie.cc website](https://www.namie.cc/ "www.namie.cc website")
* **Due to the developing status of this project, the data of the website may be deleted at any time.**

## Frontend

Frontend and backend projects are separated, checkout this project for frontend project[namie.cc-web-app](https://github.com/JamaisMagic/namie.cc-web-app)

## Edit crontab

```bash
crontab -e # Edit current users's crontab.

# 0 0,13 * * * bash ~/data/app/namie.cc-web-service/app/scripts/cron/clear-url-data.sh

crontab -l # List current user's cron jobs.
```

Maybe cron jobs log are located at /var/log/syslog or /var/log/
See just cron jobs in that logfile by running

```bash
grep CRON /var/log/syslog
```

## Misc

Because the container does not map ports to the host, you should run a script in another container with the same network(--network webnet).
For running a test script for api, checkout this image:[network-tools](https://hub.docker.com/r/jonlabelle/network-tools)
For example.

```bash
docker run --rm -it --network webnet jonlabelle/network-tools curl -v namie_cc_web_service:8010
```
