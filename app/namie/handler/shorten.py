#!/usr/bin/python
# -*- coding: utf-8 -*-

import tornado
import tornado.web
import tornado.gen
import validators
import re
import logging

from ..lib.base62 import Base62
from .. import config
from baseHandle import BaseHandler
from .. dal.shorten import Dal


class ShortenHandler(BaseHandler):
    PRE_FIX = 'cc_namie_url_short_'

    @tornado.gen.coroutine
    def post(self):
        origin = self.request.headers.get('Origin', '')
        match = re.match(r'^https?://(?:[^/]*\.)?(namie\.(?:cc)|picoluna\.(?:com)|localhost)(?::[0-9]+)?$', origin)
        if not match:
            self.set_status(403)
            self.finish()
            return
        url = self.body_dict.get('url', '').strip() or self.get_body_argument('url', '')
        ip = self.request.remote_ip
        rdbc = self.conn.rdbc

        if len(url) <= 0:
            self.res_fail(1, 'Failed')
            return

        if not validators.url(url):
            self.res_fail(1, 'Not a url')
            return

        existed = rdbc.get(self.PRE_FIX + url)
        if existed is not None:
            self.success(existed, url)
            return

        last_row_id = Dal.insert_url(self.conn.dbc, url, ip)
        base62_encoded = Base62.encode(last_row_id)
        res_url_id = base62_encoded
        if len(base62_encoded) < 6:
            res_url_id = base62_encoded.zfill(6)

        self.success(res_url_id, url)
        rdbc.setex(self.PRE_FIX + url, 3600 * 24 * 7, res_url_id)

    def success(self, url_id, original_url):
        self.res_success({
            'url': config.HOST + '/' + url_id,
            'original': original_url
        })
