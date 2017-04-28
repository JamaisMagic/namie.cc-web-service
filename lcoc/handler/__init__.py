#!/usr/bin/python
# -*- coding: utf-8 -*-
""" Handlers
"""

import logging
import tornado.web
import tornado.gen

from . import status
from . import shorten
from . import redirect


class IndexHandler(tornado.web.RequestHandler):
    def get(self):
        self.finish('''Hello World.''')
        return

if __name__ == '__main__':
    pass
