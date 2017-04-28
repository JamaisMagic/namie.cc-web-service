#!/usr/bin/python
# -*- coding: utf-8 -*-
""" Handlers
"""

import random
import tornado.web
import tornado.gen
import time
from ..lib.base62 import Base62
from .. import config


def probability(val):
    return random.random() < val


class ShortenHandler(tornado.web.RequestHandler):
    @tornado.gen.coroutine
    def get(self):
        url = self.get_argument('url', '', True)
        ip = self.request.remote_ip

        cursor = self.conn.dbc.cursor()

        sql_insert = 'insert into url(id_transfer,url,ip) values(%s,%s,%s)'
        cursor.execute(sql_insert, ('1', url, ip))
        last_row_id = cursor.lastrowid
        sql_update = 'update url set id_transfer="%s" where id=%s'
        base62_encoded = Base62.encode(last_row_id)
        cursor.execute(sql_update, (base62_encoded, last_row_id,))

        cursor.close()
        self.conn.dbc.commit()

        result = {
            'url': config.HOST + ':5501/' + base62_encoded,
            'original': url
        }
        self.write(result)
        raise tornado.gen.Return()



