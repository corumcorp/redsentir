FROM python:2.7
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1
RUN mkdir /application
WORKDIR /application
COPY requirements.txt requirements.txt
RUN apt-get update
RUN apt-get -y install vim
RUN pip install --upgrade pip
RUN pip install --trusted-host pypi.python.org -r requirements.txt