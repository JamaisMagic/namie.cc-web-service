#!/usr/bin/python
# -*- coding: utf-8 -*-

import tornado
import tornado.web
import tornado.gen
import logging

from .. import config
from baseHandle import BaseHandler


class AllowedHostnameHandler(BaseHandler):
    @tornado.gen.coroutine
    def get(self):
        self.res_success({
            'hostname_list': config.ALLOW_URL_HOSTNAME,
        })
    