#!/usr/bin/python
# -*- coding: utf-8 -*-


class Dal(object):
    def __init__(self):
        pass

    @staticmethod
    def insert_url(dbc, url, ip):
        cursor = dbc.cursor()

        sql_insert = 'insert into url(url, ip) values(%s, %s)'
        cursor.execute(sql_insert, (url, ip))
        last_row_id = cursor.lastrowid
        cursor.close()
        dbc.commit()

        return last_row_id
