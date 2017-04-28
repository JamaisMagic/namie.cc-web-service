#!/usr/bin/python
# -*- coding: utf-8 -*-
""" Handlers
"""

import tornado.web
import tornado.gen
from ..lib.base62 import Base62


class RedirectHandler(tornado.web.RequestHandler):
    @tornado.gen.coroutine
    def get(self, **params):
        redirect_id = params['redirect_id']
        redirect_id_base_10 = Base62.decode(redirect_id)

        cursor = self.conn.dbc.cursor()
        sql_select = 'select url from url where id=%s limit 1'
        count = cursor.execute(sql_select, (redirect_id_base_10,))
        data_item = cursor.fetchmany(count)
        data_url = data_item[0][0]

        cursor.close()
        self.conn.dbc.commit()

        self.add_header('cache-control', 'no-cache, no-store, max-age=0, must-revalidate')
        self.add_header('pragma', 'no-cache')
        self.redirect(data_url, False, 301)
