import sys
import json
import logging
from os import path
from os import environ
import argparse
import asyncio
import tornado

from namie import config
from namie import handler as hdl
from namie import conn

__author__ = 'Jamais Ng'


handlers = [
    (r"/", hdl.IndexHandler),
    (r"/api/shorten/?", hdl.shorten.ShortenHandler),
    (r"/api/allowed_hostname/?", hdl.allowHostname.AllowedHostnameHandler),
    (r"/api/cookie/?", hdl.setCookie.SetCookieHandler),
    (r"/api/sse/demon/interval/?", hdl.sse.demon.IntervalHdl),
    (r"/api/manage/delete-all/?", hdl.deleteAll.DeleteAllHandler),
    (r"/([0-9|a-z|A-Z]+/?)", hdl.redirect.RedirectHandler)
]

tornado.web.RequestHandler.conn = conn.Conn()

class MainHandler(tornado.web.RequestHandler):
    def get(self):
        self.write("Hello, world")

def make_app():
    settings = {
        'static_path':
            path.join(path.dirname(path.abspath(__file__)), 'static'),
        'compress_response': True
    }
    return tornado.web.Application(handlers=handlers, **settings)

async def main():
    app = make_app()
    app.listen(environ.get('APP_PORT', 8010))
    logging.warning('Started with python: %s, locate: %s, TEST: %s' % (
        sys.version.split()[0],
        path.dirname(path.abspath(__file__)),
        config.APP_ENV))
    await asyncio.Event().wait()

if __name__ == "__main__":
    asyncio.run(main())
