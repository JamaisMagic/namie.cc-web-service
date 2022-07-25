#!/usr/bin/python
# -*- coding: utf-8 -*-

import tornado
import tornado.web
import tornado.gen
import validators
import re
import logging
import hashlib
from urlparse import urlparse

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
        
        if not ShortenHandler.is_allow_url(url):
            self.res_fail(1, 'Not allowed hostname.')
            logging.warning('Not allowed hostname: %s', url)
            return

        existed = rdbc.get(self.PRE_FIX + url)
        if existed is not None:
            self.success(existed, url)
            return

        ua = self.request.headers.get('User-Agent', '')

        url_table_index = str(ShortenHandler.base16_to_base10(ShortenHandler.calculate_md5(url)))[0:1]
        url_table_name = 'url_%s' % url_table_index

        last_row_id = Dal.insert_url_with_table(self.conn.dbc, url_table_name, url, ip, ua)
        base62_encoded = Base62.encode(int(str(last_row_id) + str(url_table_index)))
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

    @staticmethod
    def calculate_md5(string):
        return hashlib.md5(string).hexdigest()

    @staticmethod
    def base16_to_base10(num16):
        return int(num16, 16)
    
    @staticmethod
    def is_allow_url(url):
        parse_re = urlparse(url)
        if parse_re.scheme is not 'https':
          return False
        
        if parse_re.netloc not in config.ALLOW_URL_HOSTNAME:
            return False
        
        return True
        
