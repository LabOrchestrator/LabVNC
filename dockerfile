FROM python:2

WORKDIR /usr/src/app

COPY requirements.txt ./
RUN pip install --no-cache-dir -r requirements.txt

ENV NOVNCVERSION=1.2.0
RUN wget https://github.com/novnc/noVNC/archive/refs/tags/v$NOVNCVERSION.zip
RUN unzip v$NOVNCVERSION.zip
RUN mv noVNC-$NOVNCVERSION noVNC
RUN cp -r noVNC/app noVNC/core noVNC/utils noVNC/vendor noVNC/vnc.html noVNC/vnc_lite.html noVNC/po .
RUN rm -Rf noVNC

EXPOSE 8002

CMD [ "python", "-m", "SimpleHTTPServer", "8002" ]
