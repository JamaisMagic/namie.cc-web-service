#!/usr/bin/python
# -*- coding: utf-8 -*-

import random
import tornado.web
import tornado.gen as gen
import tornado
import time
import logging
import json

from ..lib.base62 import Base62
from .. import config
from baseHandle import BaseHandler


def probability(val):
    return random.random() < val


class ShortenHandler(BaseHandler):
    @gen.coroutine
    def post(self):
        url = (self.body_dict['url'] or '').strip()
        ip = self.request.remote_ip
        logging.warn('url %s', url)
        if len(url) <= 0:
            self.result_data['code'] = 1
            self.result_data['msg'] = 'Failed'
            self.finish(self.result_data)
            return

        cursor = self.conn.dbc.cursor()

        sql_insert = 'insert into url(url,ip) values(%s,%s)'
        cursor.execute(sql_insert, (url, ip))
        last_row_id = cursor.lastrowid
        base62_encoded = Base62.encode(last_row_id)

        cursor.close()
        self.conn.dbc.commit()

        res_url_id = base62_encoded
        if len(base62_encoded) < 6:
            res_url_id = base62_encoded.zfill(6)

        self.result_data['code'] = 0
        self.result_data['msg'] = 'Success'
        self.result_data['data'] = {
            'url': config.HOST + '/' + res_url_id,
            'original': url
        }
        self.finish(self.result_data)
