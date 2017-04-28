#!/usr/bin/python
# -*- coding: utf-8 -*-
""" Handlers
"""

import random
import tornado.web
import tornado.gen


def probability(val):
    return random.random() < val


class StatusHandler(tornado.web.RequestHandler):
    permit_mcc = {}

    # @tornado.gen.coroutine
    def get(self):
        self.write('''Hello Shorten.''')
        self.finish('finished.')
        return


