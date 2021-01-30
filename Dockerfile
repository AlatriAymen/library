FROM node

ENV NODE_WORKDIR=/app

WORKDIR ["${NODE_WORKDIR}"]

COPY ["package.json", "package-lock.json*", "./"]

RUN npm install

EXPOSE 8080

COPY . .

CMD node index.js
