FROM ubuntu:latest
MAINTAINER orlinbox
RUN apt update
RUN apt install -y nodejs nodejs-legacy npm
RUN npm install -g gulp-cli
RUN npm link gulp
WORKDIR /usr/local/src

# docker build -t fe-theme .
# docker run -v $(pwd):/usr/local/src -u $(id -u):$(id -g) fe-theme npm install

# gulp or gulp watch
# docker run -v $(pwd):/usr/local/src -u $(id -u):$(id -g) fe-theme gulp
# docker run -v $(pwd):/usr/local/src -u $(id -u):$(id -g) fe-theme gulp watch

# gulp watch in background:
# docker run -dit -v $(pwd):/usr/local/src -u $(id -u):$(id -g) fe-theme gulp watch

# run apache:
# docker run -dit -p 8080:80 -v $(pwd):/usr/local/apache2/htdocs/ httpd:alpine
# http://localhost:8080/styleguide.html
