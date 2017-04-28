#!/usr/bin/python
# -*- coding: utf-8 -*-
""" Config
"""

import argparse

parser = argparse.ArgumentParser()
parser.add_argument("-t", "--test")
parser.add_argument("-p", "--port")
args, unknown = parser.parse_known_args()
TEST = (args.test).upper()

if TEST not in ('OFFICIAL', 'TEST'):
    raise Exception("TEST type error: %s" % TEST)

if TEST == "OFFICIAL":
    HOST = "http://namie.cc"
else:
    HOST = "http://namie.cc"

DB_TEST = {
    'HOST': '127.0.0.1',
    'PORT': 3306,
    'USER': 'root',
    'PWD': '123456',
    'DB': 'short_url_test',
}

DB_OFFICIAL = {
    'HOST': '127.0.0.1',
    'PORT': 3306,
    'USER': 'root',
    'PWD': '123456',
    'DB': 'short_url',
}

RDB_TEST = {
    'HOST': '127.0.0.1',
    'PORT': 6379,
    'PWD': '',
    'DB': 0,
}

RDB_OFFICIAL = {
    'HOST': '127.0.0.1',
    'PORT': 6379,
    'PWD': '',
    'DB': 0,
}

DB = locals()['DB_%s' % TEST]
RDB = locals()['RDB_%s' % TEST]

