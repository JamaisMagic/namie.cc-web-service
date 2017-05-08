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
from .. dal.shorten import Dal


def probability(val):
    return random.random() < val


class ShortenHandler(BaseHandler):
    @gen.coroutine
    def post(self):
        url = (self.body_dict['url'] or '').strip()
        ip = self.request.remote_ip
        rdbc = self.conn.rdbc

        if len(url) <= 0:
            self.result_data['code'] = 1
            self.result_data['msg'] = 'Failed'
            self.finish(self.result_data)
            return

        existed = rdbc.get(url)
        if existed is not None:
            self.res_success(existed, url)
            return

        last_row_id = Dal.insert_url(self.conn.dbc, url, ip)
        base62_encoded = Base62.encode(last_row_id)
        res_url_id = base62_encoded
        if len(base62_encoded) < 6:
            res_url_id = base62_encoded.zfill(6)

        self.res_success(res_url_id, url)
        rdbc.setex(url, 3600 * 24 * 7, res_url_id)

    def res_success(self, url_id , original_url):
        self.result_data['code'] = 0
        self.result_data['msg'] = 'Success'
        self.result_data['data'] = {
            'url': config.HOST + '/' + url_id,
            'original': original_url
        }
        self.finish(self.result_data)
