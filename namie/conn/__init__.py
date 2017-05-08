#!/usr/bin/python
# -*- coding: utf-8 -*-

import MySQLdb
import redis

from .. import config


class Conn:
    def __init__(self):
        db_setting = config.DB
        rdb_setting = config.RDB
        conn = MySQLdb.connect(
            host=db_setting['HOST'],
            port=db_setting['PORT'],
            user=db_setting['USER'],
            passwd=db_setting['PWD'],
            db=db_setting['DB'])

        rconn = redis.StrictRedis(
            host=rdb_setting['HOST'],
            port=rdb_setting['PORT'],
            db=rdb_setting['DB'])

        self.dbc = conn
        self.rdbc = rconn
