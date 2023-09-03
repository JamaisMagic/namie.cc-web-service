FROM python:3.11

WORKDIR /data/app
COPY ./requirements.txt ./
RUN pip install --no-cache-dir -r requirements.txt
COPY . .
CMD [ "python", "./app/server.py" ]
