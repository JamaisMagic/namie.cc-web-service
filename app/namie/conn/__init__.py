# -*- coding: utf-8 -*-

import pymysql
import redis

from .. import config


class Conn:
    def __init__(self):
        self.dbc = None
        self.rdbc = None
        self.db_connect()
        self.rdb_connect()

    def db_connect(self):
        db_setting = config.DB
        conn = pymysql.connect(
            host=db_setting['HOST'],
            port=int(db_setting['PORT']),
            user=db_setting['USER'],
            passwd=db_setting['PWD'],
            db=db_setting['DB'],
            charset='utf8')

        self.dbc = conn

    def rdb_connect(self):
        rdb_setting = config.RDB
        rconn = redis.StrictRedis(
            host=rdb_setting['HOST'],
            port=int(rdb_setting['PORT']),
            db=rdb_setting['DB'])

        self.rdbc = rconn
