# -*- coding: utf-8 -*-
""" Config
"""

from os import environ


APP_PORT = environ.get("APP_PORT", 8010)
APP_ENV = environ.get("APP_ENV", "development")

REDIS_HOST = environ.get("REDIS_HOST", "127.0.0.1")
REDIS_PORT = environ.get("REDIS_PORT", 6379)

MYSQL_HOST = environ.get("MYSQL_HOST", "127.0.0.1")
MYSQL_PORT = environ.get("MYSQL_PORT", 3306)
MYSQL_USER = environ.get("MYSQL_USER", "root")
MYSQL_PWD = environ.get("MYSQL_PWD", "123456")
MYSQL_DB_NAME = environ.get("MYSQL_DB_NAME", "www_namie_cc")


if APP_ENV not in ("development", "production"):
    raise Exception("APP_ENV type error: %s" % APP_ENV)

if APP_ENV == "production":
    HOST = "https://namie.cc"
else:
    HOST = "http://qa.namie.cc"

DB = {
    "HOST": MYSQL_HOST,
    "PORT": MYSQL_PORT,
    "USER": MYSQL_USER,
    "PWD": MYSQL_PWD,
    "DB": MYSQL_DB_NAME,
}

RDB = {
    "HOST": REDIS_HOST,
    "PORT": REDIS_PORT,
    "PWD": "",
    "DB": 15,
}

ALLOW_URL_HOSTNAME = (
    "google.com",
    "www.google.com",
    "youtube.com",
    "www.youtube.com",
    "baidu.com",
    "www.baidu.com",
    "twitter.com",
    "www.twitter.com",
    "namie.cc",
    "www.namie.cc",
    "github.com",
    "www.github.com",
)

REQUEST_ALLOW_ORIGIN = [
    "https://www.namie.cc",
    "http://www.namie.cc",
    "https://namie.cc",
    "http://namie.cc",
    "https://www.picoluna.com",
    "http://www.picoluna.com",
    "https://picoluna.com",
    "http://picoluna.com",
    "https://qa.namie.cc",
    "http://qa.namie.cc",
    "https://qa.www.namie.cc",
    "http://qa.www.namie.cc",
    "http://127.0.0.1:5173",
    "http://localhost:5173",
]
