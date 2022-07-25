#!/usr/bin/python
# -*- coding: utf-8 -*-
""" Handlers
"""

import tornado
import tornado.web
import tornado.gen
import logging
from urlparse import urlparse

from .. import config
from ..lib.base62 import Base62
from baseHandle import BaseHandler
from ..dal.redirect import Dal

__author__ = 'Jamais'


class RedirectHandler(BaseHandler):
    PREFIX = 'cc_namie_url_id_'

    @tornado.gen.coroutine
    def get(self, url_id):
        self.add_header('Cache-Control', 'no-cache, no-store, max-age=0, must-revalidate')
        self.add_header('Pragma', 'no-cache')

        rdbc = self.conn.rdbc
        redirect_id_base_10 = Base62.decode(url_id)
        db_id = int(str(redirect_id_base_10)[0:-1])
        table_index = str(redirect_id_base_10)[-1]
        table_name = 'url_%s' % table_index

        data_url = rdbc.get(self.PREFIX + str(redirect_id_base_10))

        if data_url is None:
            data_url = Dal.query_url_with_table(self.conn.dbc, table_name, db_id)
            if data_url is not None:
                rdbc.setex(self.PREFIX + str(redirect_id_base_10), 3600 * 24 * 7, data_url)

        if data_url is None:
            self.finish('No such url.')
            logging.warning('redirect url not exists: %s', url_id)
            return
        
        if not RedirectHandler.is_allow_url(data_url):
            self.finish('Not allowed hostname.')
            logging.warning('Not allowed hostname: %s', data_url)
            return

        self.redirect(data_url, False, 307)
    
    @staticmethod
    def is_allow_url(url):
        parse_re = urlparse(url)
        if parse_re.scheme is not 'https':
          return False
        
        if parse_re.netloc not in config.ALLOW_URL_HOSTNAME:
            return False
        
        return True    