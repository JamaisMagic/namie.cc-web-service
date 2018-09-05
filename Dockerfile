FROM python:2.7-alpine as development

WORKDIR /data/app/www.namie.cc
COPY ./requirements.txt /data/app/www.namie.cc/

ENV APP_ENV development
ENV APP_PORT 8010

RUN apk --no-cache --virtual build-dependencies add \
    musl-dev \
    gcc \
    mariadb-dev \
    && pip install --no-cache-dir -r requirements.txt \
    && apk del build-dependencies

EXPOSE 8010

CMD [ "python", "./app/server.py" ]
