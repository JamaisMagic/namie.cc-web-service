#!/usr/bin/python
# -*- coding: utf-8 -*-

import logging
import tornado.web
import tornado.gen as gen

from . import status
from . import shorten
from . import redirect
from . import test

__author__ = 'Jamais'


class IndexHandler(tornado.web.RequestHandler):
    @gen.coroutine
    def get(self):
        self.finish('Hello.')

if __name__ == '__main__':
    pass
