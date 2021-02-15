FROM node:12
WORKDIR /use/src/app
COPY . /use/src/app
RUN npm install
USER root 
RUN yum install mysql -y
COPY . .
EXPOSE 8000
CMD ["node", "server.js"]
