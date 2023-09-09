# -*- coding: utf-8 -*-

import logging

__author__ = "Jamais"


class Helper(object):
    def __init__(self):
        pass

    @staticmethod
    def execute(conn, sql, value_tuple=None):
        try:
            return conn.dbc.execute(sql, value_tuple)
        except conn.dbc.OperationError as e:
            logging.warning("Dal Helper execute OperationError %s", str(e))
            conn.db_connect()
            return conn.dbc.execute(sql, value_tuple)
        finally:
            pass

    @staticmethod
    def executemany(conn, sql, args):
        try:
            return conn.dbc.executemany(sql, args)
        except conn.dbc.OperationError as e:
            logging.warning("Dal Helper executemany OperationError %s", str(e))
            conn.db_connect()
            return conn.dbc.executemany(sql, args)
        finally:
            pass
