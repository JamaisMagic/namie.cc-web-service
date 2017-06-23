#!/usr/bin/bash

git pull --rebase &&
echo 'pull succeed. Restart manual.' &&
supervisorctl -c /data/app/namie.cc/supervisord.conf
