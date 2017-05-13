# A simple url shortener

### environment
ubuntu 16.04 lts, python 2.7.12, mysql 5.7.18, redis 3.0.6

* sudo apt-get install python
* sudo apt-get install python-dev
* sudo apt-get install build-essential
* sudo apt-get install python-pip
* sudo apt-get install mysql-server
* sudo apt-get install libmysqlclient-dev
* sudo apt-get install redis-server
* sudo -H pip install -r requirements.txt

### mysql
* create database cc_namie_normal_test default character set utf8; (for test.)
* create database cc_namie_normal default character set utf8;

    
    create table url (
        id INT NOT NULL AUTO_INCREMENT,
        url TEXT NOT NULL, 
        ct DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
        ip VARCHAR(15),
        PRIMARY KEY (id)
    )ENGINE=INNODB DEFAULT CHARSET=utf8;

### supervisor 3.3.1
* pip install supervisor

### run
#### for test
* sudo supervisord -c /vagrant_data/namie.cc/supervisord.conf
* sudo supervisorctl -c /vagrant_data/namie.cc/supervisord.conf
* or
* python server.py -p 4020 -t test
#### for production
* sudo supervisord -c /data/app/namie.cc/supervisord.conf
* sudo supervisorctl -c /data/app/namie.cc/supervisord.conf

### auto run when reboot on ubuntu 16.04
1. sudo crontab -e
2. then add this line to the bottom of the file
   @reboot sudo supervisord -c /data/app/namie.cc/supervisord.conf

### website
* [namie.cc website](https://namie.cc/ "namie.cc website")
* due to the developing status of this project, the data of the website may be deleted at any time.
