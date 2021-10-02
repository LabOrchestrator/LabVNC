FROM alpine

WORKDIR /usr/src/app

RUN apk add --no-cache nginx wget unzip


ENV NOVNCVERSION=1.2.0
RUN wget https://github.com/novnc/noVNC/archive/refs/tags/v$NOVNCVERSION.zip
RUN unzip v$NOVNCVERSION.zip
RUN mv noVNC-$NOVNCVERSION noVNC
RUN cp -r noVNC/app noVNC/core noVNC/utils noVNC/vendor noVNC/vnc.html noVNC/vnc_lite.html noVNC/po .
RUN rm -Rf noVNC v$NOVNCVERSION.zip po vnc.html vnc_lite.html


COPY lab_vnc.html ./
COPY lab_vnc.js ./app

COPY nginx_config.conf /etc/nginx/http.d/default.conf

EXPOSE 8002
CMD [ "nginx", "-g", "daemon off;" ]
