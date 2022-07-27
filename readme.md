# An url shortener written in python

## Environment

ubuntu 16.04 lts, python 2.7.12, mysql 5.7.18, redis 3.0.6

```bash
sudo apt-get install python
sudo apt-get install python-dev
sudo apt-get install python-setuptools
sudo apt-get install build-essential
sudo apt-get install python-pip
sudo apt-get install mysql-server
sudo apt-get install libmysqlclient-dev
sudo apt-get install redis-server
sudo -H pip install -r requirements.txt
```

## mysql

For test

```sql
create database cc_namie_normal_test default character set utf8;
```

For production

```sql
create database cc_namie_normal default character set utf8;
```

```sql
create table url (
        id INT NOT NULL AUTO_INCREMENT,
        url TEXT NOT NULL, 
        ct DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
        ip VARCHAR(15),
        PRIMARY KEY (id)
    )ENGINE=INNODB DEFAULT CHARSET=utf8;
```

## supervisor 3.3.1

```bash
pip install wheel
pip install supervisor
```

## Run

### For test

```bash
sudo supervisord -c /vagrant_data/namie.cc/supervisord.test.conf
sudo supervisorctl -c /vagrant_data/namie.cc/supervisord.test.conf
# or
python server.py -p 4020 -t test
```

### For production

```bash
sudo supervisord -c /data/app/namie.cc/supervisord.conf
sudo supervisorctl -c /data/app/namie.cc/supervisord.conf
```

## Auto run when reboot on ubuntu 16.04

```bash
sudo crontab -e
# then add this line to the bottom of the file
@reboot sudo supervisord -c /data/app/namie.cc/supervisord.conf
```

## If you find something wrong with https or ipv6 conf, see [this article](https://chrisjean.com/fix-nginx-emerg-bind-to-80-failed-98-address-already-in-use/) may help you.

> Using ipv6only=on ensures that the IPv6 listen directive will only bind to IPv6 and not automatically to IPv4 as well.

## Website

* [www.namie.cc website](https://www.namie.cc/ "www.namie.cc website")
* **Due to the developing status of this project, the data of the website may be deleted at any time.**

## Limitation and whitelist

For security reason, this service only support the following hostnames.

```python
ALLOW_URL_HOSTNAME = (
    'google.com',
    'www.google.com',
    'youtube.com',
    'www.youtube.com',
    'baidu.com',
    'www.baidu.com',
    'twitter.com',
    'www.twitter.com',
    'namie.cc',
    'www.namie.cc',
    'github.com',
    'www.github.com',
)
```

The latest whitelist, check [this api](https://www.namie.cc/api/allowed_hostname/)

## Docker

If you want to use docker, you can also run docker compose directly.

```bash
bash run_docker_dev.sh up
```

To install docker and docker compose, visit the [official website](https://docs.docker.com/install/).

## Todo

* Upgrade to python3
* Upgrade to vue3
* Replace vue-cli with vite.
