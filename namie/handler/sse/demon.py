#!/usr/bin/python
# -*- coding: utf-8 -*-

import tornado
import tornado.web
import tornado.gen
import json
import random
import datetime
import logging


__author__ = 'Jamais'


class IntervalHdl(tornado.web.RequestHandler):
    def initialize(self):
        pass

    def prepare(self):
        self.set_header('Content-Type', 'text/event-stream')
        self.set_header('Cache-Control', 'no-cache')
        self.set_header('X-Accel-Buffering', 'no')

    @tornado.gen.coroutine
    def get(self):
        count = 0
        while True:
            count = count + 1
            event = 'pyevent'
            mod = round(random.random() * 10) % 2
            if mod == 0:
                event = ''

            self.write(
                'id:{}\nevent:{}\ndata:{}\n\n'.format(
                    datetime.datetime.now(),
                    event,
                    json.dumps({
                        'error': mod,
                        'message': 'Hello %s' % datetime.datetime.now()
                    })
                )
            )

            if count >= 5:
                raise self.finish()

            self.flush()
            yield tornado.gen.sleep(10)
