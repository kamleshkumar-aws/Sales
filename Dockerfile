FROM mode:12
WORKDIR /use/src/app
COPY . /use/src/app
RUN npm install
COPY . .
EXPOSE 8000
CMD ["node", "server.js"]
