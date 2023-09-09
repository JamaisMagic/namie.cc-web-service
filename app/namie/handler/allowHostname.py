# -*- coding: utf-8 -*-

import tornado
import logging

from .. import config
from .baseHandle import BaseHandler


class AllowedHostnameHandler(BaseHandler):
    def get(self):
        self.res_success(
            {
                "hostname_list": config.ALLOW_URL_HOSTNAME,
            }
        )
