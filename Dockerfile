FROM ubuntu:latest
MAINTAINER orlinbox
RUN apt update
RUN apt install -y wget gnupg
RUN wget https://deb.nodesource.com/setup_8.x; chmod +x setup_8.x; ./setup_8.x
RUN apt update
RUN apt install -y nodejs
WORKDIR /root/work

# docker build -t nodejs8bootstrap .
# make sure the next path match -> local:container
# docker run -it -P -v ~/repo/fe-theme:/root/work nodejs8bootstrap
