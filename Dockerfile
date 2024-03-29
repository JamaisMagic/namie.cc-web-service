FROM python:3.11.5-alpine3.18

WORKDIR /data/app
COPY . .
RUN pip install --no-cache-dir -r requirements.txt
CMD [ "python", "./app/server.py" ]
