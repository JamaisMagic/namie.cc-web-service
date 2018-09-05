#!/usr/bin/python
# -*- coding: utf-8 -*-

import sys
import json
import logging
from os import path
from os import environ
import argparse
import tornado
import tornado.httpserver
import tornado.ioloop
import tornado.web

from namie import config
from namie import handler as hdl
from namie import conn

__author__ = 'Jamais'


handlers = [
    (r"/", hdl.IndexHandler),
    (r"/api/shorten/?", hdl.shorten.ShortenHandler),
    (r"/api/sse/demon/interval/?", hdl.sse.demon.IntervalHdl),
    (r"/([0-9|a-z|A-Z]+/?)", hdl.redirect.RedirectHandler)
]

tornado.web.RequestHandler.conn = conn.Conn()


def run(port):
    settings = {
        'static_path':
            path.join(path.dirname(path.abspath(__file__)), 'static'),
        'compress_response': True
    }
    app = tornado.web.Application(handlers=handlers, **settings)
    http_server = tornado.httpserver.HTTPServer(app, xheaders=True)
    http_server.listen(port)

    logging.warn('Started with python: %s, locate: %s, TEST: %s' % (
        sys.version.split()[0],
        path.dirname(path.abspath(__file__)),
        config.APP_ENV))

    tornado.ioloop.IOLoop.current().start()


if __name__ == '__main__':
    run(environ.get('APP_PORT', 8010))
