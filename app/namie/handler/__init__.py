#!/usr/bin/python
# -*- coding: utf-8 -*-

import tornado
import tornado.web
import tornado.gen
from jinja2 import Environment, PackageLoader
import logging

from . import shorten
from . import redirect
import sse as sse

__author__ = 'Jamais'

template_env = Environment(loader=PackageLoader('namie', '../static'))


class IndexHandler(tornado.web.RequestHandler):
    @tornado.gen.coroutine
    def get(self):
        template = template_env.get_template('index.html')
        self.finish(template.render())
