FROM node:14-alpine
ARG PORT
ARG WEB_MEMORY

WORKDIR /app

COPY package.json .
RUN npm install

COPY index.js .
COPY controller.js .
COPY heroku-node.sh .
RUN ["chmod", "+x", "heroku-node.sh"]

EXPOSE ${PORT}

CMD ["./heroku-node.sh", "index.js"]