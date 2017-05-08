#!/usr/bin/python
# -*- coding: utf-8 -*-
""" Handlers
"""

import tornado.web
import tornado.gen as gen
import logging

from ..lib.base62 import Base62
from baseHandle import BaseHandler


class RedirectHandler(BaseHandler):
    @gen.coroutine
    def get(self, url_id):
        self.add_header('cache-control', 'no-cache, no-store, max-age=0, must-revalidate')
        self.add_header('pragma', 'no-cache')

        redirect_id_base_10 = Base62.decode(url_id)

        cursor = self.conn.dbc.cursor()
        sql_select = 'select url from url where id=%s limit 1'
        count = cursor.execute(sql_select, (redirect_id_base_10,))

        if count <= 0:
            cursor.close()
            self.finish('No such url.')
            return

        data_item = cursor.fetchmany(count)

        data_url = data_item[0][0]

        cursor.close()
        self.conn.dbc.commit()

        self.redirect(data_url, False, 301)
