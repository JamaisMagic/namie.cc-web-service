#!/usr/bin/python
# -*- coding: utf-8 -*-

import logging

__author__ = 'Jamais'


class Dal(object):
    def __init__(self):
        pass

    @staticmethod
    def insert_url(dbc, url, ip):
        # dbc.ping(True)
        cursor = dbc.cursor()

        sql_insert = 'insert into url(url, ip) values(%s, %s)'
        cursor.execute(sql_insert, (url, ip))
        dbc.commit()
        last_row_id = cursor.lastrowid

        cursor.close()

        return last_row_id
