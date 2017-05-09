#!/usr/bin/python
# -*- coding: utf-8 -*-

import logging
from timeit import default_timer as timer

__author__ = 'Jamais'


class Dal(object):
    def __init__(self):
        pass

    @staticmethod
    def query_url(dbc, id_base_10):
        start = timer()
        ping = dbc.ping(True)
        end = timer()
        logging.warn('%s : %s', ping.server_status, ping.message)
        logging.warn('timer %s', end - start)
        cursor = dbc.cursor()

        sql_select = 'select url from url where id=%s limit 1'
        count = cursor.execute(sql_select, (id_base_10,))

        if count <= 0:
            cursor.close()
            return None

        data_item = cursor.fetchmany(count)
        data_url = data_item[0][0]

        cursor.close()

        return data_url
