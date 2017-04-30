#!/usr/bin/python
# -*- coding: utf-8 -*-

import random
import tornado.web
import tornado.gen as gen

from baseHandle import BaseHandler


class TestHandler(BaseHandler):
    @gen.coroutine
    def get(self):
        self.write('test')
