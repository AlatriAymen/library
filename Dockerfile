ENV NODE_WORKDIR=/app

WORKDIR ["${NODE_WORKDIR}"]

COPY ["package.json", "package-lock.json*", "./"]

RUN npm install

EXPOSE 3000

COPY . .

CMD node index.js