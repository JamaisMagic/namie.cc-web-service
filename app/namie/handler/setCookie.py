# -*- coding: utf-8 -*-

import tornado
import validators
import re
import logging
import hashlib
import random

from ..lib.base62 import Base62
from .. import config
from .baseHandle import BaseHandler
from ..dal.shorten import Dal


class SetCookieHandler(BaseHandler):
    def post(self):
        tornado_cookie = self.get_cookie("tornado_cookie", "")
        logging.warning("tornado_cookie: %s", tornado_cookie)
        self.set_cookie("tornado_cookie", str(random.random()))
        self.success()

    def get(self):
        self.success()

    def success(self):
        self.res_success({})
