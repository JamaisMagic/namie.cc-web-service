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
        ping = dbc.ping(True)
        cursor = dbc.cursor()

        sql_select = 'select url from url where id=%s limit 1'
        count = cursor.execute(sql_select, (id_base_10,))

        logging.warn('count: %s', count)
        logging.warn('rowcount: %s', cursor.rowcount)

        # if count <= 0:
        #     cursor.close()
        #     return None

        data_item = cursor.fetchone()
        logging.warn('one: %s', data_item)
        data_url = data_item[0]

        cursor.close()

        return data_url
