# -*- coding: utf-8 -*-

import logging

__author__ = 'Jamais'


class Helper(object):
    def __init__(self):
        pass

    @staticmethod
    def execute(conn, sql, value_tuple=None):
        try:
            return conn.dbc.execute(sql, value_tuple)
        except conn.dbc.OperationError as e:
            logging.warn('Dal Helper OperationError %s', str(e))
            conn.db_connect()
            return conn.dbc.execute(sql, value_tuple)
        finally:
            pass
