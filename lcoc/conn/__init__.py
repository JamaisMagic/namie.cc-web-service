#!/usr/bin/python
# -*- coding: utf-8 -*-

import MySQLdb

from .. import config


class Conn:
    def __init__(self):
        db_setting = config.DB
        conn = MySQLdb.connect(
            host=db_setting['HOST'],
            port=db_setting['PORT'],
            user=db_setting['USER'],
            passwd=db_setting['PWD'],
            db=db_setting['DB'])

        self.dbc = conn