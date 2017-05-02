#!/usr/bin/python
# -*- coding: utf-8 -*-

import random
import tornado.web
import tornado.gen as gen
import time

from ..lib.base62 import Base62
from .. import config
from baseHandle import BaseHandler


def probability(val):
    return random.random() < val


class ShortenHandler(BaseHandler):
    @gen.coroutine
    def get(self):
        url = self.get_argument('url', '', True)
        ip = self.request.remote_ip

        cursor = self.conn.dbc.cursor()

        sql_insert = 'insert into url(url_id,url,ip) values(%s,%s,%s)'
        cursor.execute(sql_insert, ('1', url, ip))
        last_row_id = cursor.lastrowid
        sql_update = 'update url set url_id="%s" where id=%s'
        base62_encoded = Base62.encode(last_row_id)
        cursor.execute(sql_update, (base62_encoded, last_row_id,))

        cursor.close()
        self.conn.dbc.commit()

        res_url_id = base62_encoded
        if len(base62_encoded) < 6:
            res_url_id = base62_encoded.zfill(6)

        result = {
            'url': config.HOST + '/' + res_url_id,
            'original': url
        }
        self.write(result)
        self.finish()
