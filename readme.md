# A url shortener written in python

### environment
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

### mysql
for test
```sql
create database cc_namie_normal_test default character set utf8;
```

for production
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
    

### supervisor 3.3.1
```bash
pip install wheel
pip install supervisor
```

### run
#### for test
```bash
sudo supervisord -c /vagrant_data/namie.cc/supervisord.test.conf
sudo supervisorctl -c /vagrant_data/namie.cc/supervisord.test.conf
# or
python server.py -p 4020 -t test
```

#### for production
```bash
sudo supervisord -c /data/app/namie.cc/supervisord.conf
sudo supervisorctl -c /data/app/namie.cc/supervisord.conf
```

### auto run when reboot on ubuntu 16.04
```bash
sudo crontab -e
# then add this line to the bottom of the file
@reboot sudo supervisord -c /data/app/namie.cc/supervisord.conf
```

   
### If you find something wrong with https or ipv6 conf, see [this article](https://chrisjean.com/fix-nginx-emerg-bind-to-80-failed-98-address-already-in-use/) may help you.
> Using ipv6only=on ensures that the IPv6 listen directive will only bind to IPv6 and not automatically to IPv4 as well.

### website
* [www.namie.cc website](https://www.namie.cc/ "www.namie.cc website")
* **Due to the developing status of this project, the data of the website may be deleted at any time.**

### docker
If you want to use docker, you can also run docker compose directly.
```bash
bash run_docker_dev.sh up
```

To install docker and docker compose, visit the [official website](https://docs.docker.com/install/).
