#!/usr/bin/python
# -*- coding: utf-8 -*-

import logging
import tornado.web
import tornado.gen as gen
from jinja2 import Environment, PackageLoader

from . import status
from . import shorten
from . import redirect
from . import test

__author__ = 'Jamais'

template_env = Environment(loader=PackageLoader('namie', '../static'))


class IndexHandler(tornado.web.RequestHandler):
    @gen.coroutine
    def get(self):
        template = template_env.get_template('m/subject/index/index.html')
        self.finish(template.render())
        # protocol = self.request.protocol
        # host = self.request.host
        # self.redirect('%s://%s' % (protocol, 'test.jamais.namie.cc/' if 'test' in host else 'jamais.namie.cc/'))
