#!/usr/bin/python
# -*- coding: utf-8 -*-

import tornado
import tornado.web
import tornado.gen
import validators
import re
import logging
import hashlib
import random

from ..lib.base62 import Base62
from .. import config
from baseHandle import BaseHandler
from .. dal.shorten import Dal


class SetCookieHandler(BaseHandler):
    @tornado.gen.coroutine
    def post(self):
        tornadoCookie = self.get_cookie('tornadoCookie', '')
        self.set_cookie('tornadoCookie', random.random())
        self.success()

    def success(self):
        self.res_success({

        })
