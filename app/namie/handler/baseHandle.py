# -*- coding: utf-8 -*-

import tornado
import json
import logging


__author__ = 'Jamais'


class BaseHandler(tornado.web.RequestHandler):
    def initialize(self):
        self.result_data = {
            'code': -1,
            'msg': '',
            'data': None
        }

    def prepare(self):
        content_type = self.request.headers.get('Content-Type', '')
        if content_type.startswith('application/json'):
            try:
                self.body_dict = json.loads(self.request.body)
            except ValueError as e:
                self.body_dict = dict()
        else:
            self.body_dict = dict()

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
