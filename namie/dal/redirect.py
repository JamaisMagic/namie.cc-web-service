#!/usr/bin/python
# -*- coding: utf-8 -*-


class Dal(object):
    def __init__(self):
        pass

    @staticmethod
    def query_url(dbc, id_base_10):
        cursor = dbc.cursor()

        sql_select = 'select url from url where id=%s limit 1'
        count = cursor.execute(sql_select, (id_base_10,))

        if count <= 0:
            cursor.close()
            return None

        data_item = cursor.fetchmany(count)

        data_url = data_item[0][0]

        cursor.close()
        dbc.commit()

        return data_url
