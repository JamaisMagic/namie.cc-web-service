# -*- coding: utf-8 -*-

import tornado
from jinja2 import Environment, PackageLoader
import logging

from . import shorten
from . import redirect
from . import allowHostname
from . import setCookie
from . import sse as sse
from . import deleteAll

__author__ = "Jamais"

template_env = Environment(loader=PackageLoader("namie", "../static"))


class IndexHandler(tornado.web.RequestHandler):
    def get(self):
        template = template_env.get_template("index.html")
        self.finish(template.render())
