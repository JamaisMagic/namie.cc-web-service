# -*- coding: utf-8 -*-

import logging
from .baseHandle import BaseHandler
from ..dal.shorten import Dal


class DeleteAllHandler(BaseHandler):
    def post(self):
        ip = self.request.remote_ip
        ua = self.request.headers.get("User-Agent", "")
        origin = self.request.headers.get("Origin", "")
        client_timestamp = self.body_dict.get(
            "timestamp", ""
        ).strip() or self.get_body_argument("timestamp", "")
        rdbc = self.conn.rdbc

        logging.warning(
            "Someone delete all the url data. ip: %s, ua: %s, origin: %s, client timestamp: %s"
            % (ip, ua, origin, client_timestamp)
        )

        total_rows = Dal.delete_all_url(self.conn.dbc)
        for key in rdbc.scan_iter("cc_namie_url_short:*"):
            rdbc.delete(key)
        for key in rdbc.scan_iter("cc_namie_url_id:*"):
            rdbc.delete(key)

        logging.warning(
            "Someone deleted all the url data. ip: %s, ua: %s, origin: %s, client timestamp: %s, total rows: %i"
            % (ip, ua, origin, client_timestamp, total_rows)
        )

        self.res_success({"rows": total_rows})
