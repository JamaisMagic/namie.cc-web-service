#!/usr/bin/python
# -*- coding: utf-8 -*-
""" Handlers
"""

import random
import tornado.web
import tornado.gen as gen


def probability(val):
    return random.random() < val


class StatusHandler(tornado.web.RequestHandler):
    permit_mcc = {}

    @gen.coroutine
    def get(self):
        self.write('''Hello Shorten.''')
        self.finish('finished.')
