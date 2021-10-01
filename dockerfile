FROM python:3.9-slim-buster

WORKDIR /usr/src/app

RUN apt-get update && apt-get install -y nginx wget unzip \
 && apt-get autoclean && apt-get autoremove && rm -rf /var/lib/apt/lists/* && rm -rf /var/cache


COPY requirements.txt ./
RUN pip install --no-cache-dir -r requirements.txt

ENV NOVNCVERSION=1.2.0

RUN wget https://github.com/novnc/noVNC/archive/refs/tags/v$NOVNCVERSION.zip
RUN unzip v$NOVNCVERSION.zip
RUN mv noVNC-$NOVNCVERSION noVNC
RUN cp -r noVNC/app noVNC/core noVNC/utils noVNC/vendor noVNC/vnc.html noVNC/vnc_lite.html noVNC/po .
RUN rm -Rf noVNC v$NOVNCVERSION.zip requirements.txt po vnc.html vnc_lite.html



COPY lab_vnc.html ./
COPY lab_vnc.js ./app

COPY nginx_config.conf /etc/nginx/conf.d/default.conf

EXPOSE 8002
CMD [ "nginx", "-g", "daemon off;" ]
