#!/usr/bin/python
# -*- coding: utf-8 -*-

import json
import logging
import tornado
import tornado.web
import tornado.gen as gen


__author__ = 'Jamais'


class BaseHandler(tornado.web.RequestHandler):
    def initialize(self):
        self.result_data = {
            'code': -1,
            'msg': '',
            'data': None
        }
        try:
            self.body_dict = json.loads(self.request.body)
        except ValueError, e:
            self.body_dict = dict()

    def prepare(self):
        pass

    @gen.coroutine
    def options(self):
        self.finish()

    def res_success(self, data):
        self.result_data['code'] = 0
        self.result_data['msg'] = 'Success'
        self.result_data['data'] = data
        self.finish(self.result_data)

    def res_fail(self, code, msg):
        self.result_data['code'] = code
        self.result_data['msg'] = msg
        self.result_data['data'] = None
        self.finish(self.result_data)
