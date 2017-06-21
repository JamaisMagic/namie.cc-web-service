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
        # self.add_access_control()
        pass

    @gen.coroutine
    def options(self):
        self.finish()

    def add_access_control(self):
        self.add_header('Access-Control-Allow-Origin', '*')
        self.add_header('Access-Control-Request-Method', 'GET, POST, OPTIONS, HEAD')
        self.add_header('Access-Control-Accept-Headers', 'Content-Type, X-Requested-With, Origin, Accept, Authorization')
        self.add_header('Access-Control-Expose-Headers', 'Date')

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
