FROM python:3.8-slim-buster
MAINTAINER Hyesun Yoo <yoohs7974@gmail.com>

# Set working directory
WORKDIR /ai/src

COPY requirements.txt /ai/src

RUN apt-get update

# Core linux dependencies.
RUN apt-get install -y \
    build-essential \
    cmake \
    unzip

# Python dependencies
RUN pip3 install -r requirements.txt

# logging path mount
# volume ["/root/extractor/logfile", "/root/extractor"]

COPY ./ /ai/src/

# Gunicorn
CMD ["gunicorn", "--worker-class", "eventlet", "-w", "1", "-b", "0.0.0.0:5005", "wsgi:app"]

EXPOSE 5005