#!/usr/bin/bash

echo 'Restart manual.'
supervisorctl -c /vagrant_data/namie.cc/supervisord.test.conf
