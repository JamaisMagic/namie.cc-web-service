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
        dbc.ping(True)
        cursor = dbc.cursor()

        sql_select = 'select url from url where id=%s limit 1'
        count = cursor.execute(sql_select, (id_base_10,))
        dbc.commit()

        if count <= 0:
            cursor.close()
            return None

        data_item = cursor.fetchone()
        data_url = data_item[0]

        cursor.close()

        return data_url

    @staticmethod
    def query_url_with_table(dbc, table_name, id_base_10):
        dbc.ping(True)
        cursor = dbc.cursor()

        sql_select = 'select url from {0} where id=%s limit 1'.format(table_name)
        count = cursor.execute(sql_select, (id_base_10,))
        dbc.commit()

        if count <= 0:
            cursor.close()
            return None

        data_item = cursor.fetchone()
        data_url = data_item[0]

        cursor.close()

        return data_url
