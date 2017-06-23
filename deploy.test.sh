#!/usr/bin/bash

echo 'Restart manual.'
sudo supervisorctl -c /vagrant_data/namie.cc/supervisord.test.conf
