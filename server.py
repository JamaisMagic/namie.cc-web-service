#!/usr/bin/python
# -*- coding: utf-8 -*-
""" Web Server
"""

import sys
import json
import logging
import tornado.httpserver
import tornado.ioloop
import tornado.options
import tornado.web
from os import path

from lcoc import config
from lcoc import handler as hdl
from lcoc import conn

handlers = [
    (r"/", hdl.IndexHandler),
    (r"/test/?", hdl.IndexHandler),
    (r"/api/shorten/?", hdl.shorten.ShortenHandler),
    (r"/?(?P<redirect_id>[0-9|a-z|A-Z]+/?)?", hdl.redirect.RedirectHandler)
]


tornado.web.RequestHandler.conn = conn.Conn()

def run(port):
    settings = {
        'static_path':
            path.join(path.dirname(path.abspath(__file__)), 'static'),
        'compress_response': True,
    }
    app = tornado.web.Application(handlers=handlers, **settings)
    http_server = tornado.httpserver.HTTPServer(app, xheaders=True)
    http_server.listen(port)

    logging.warn("Started with python: %s, locate: %s, TEST: %s" % (
        sys.version.split()[0],
        path.dirname(path.abspath(__file__)),
        config.TEST))

    tornado.ioloop.IOLoop.current().start()


if __name__ == "__main__":
    import argparse

    parser = argparse.ArgumentParser()
    parser.add_argument("-p", "--port")
    args, unknown = parser.parse_known_args()
    run(args.port)
