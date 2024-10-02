FROM ghcr.io/puppeteer/puppeteer:23.4.1

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm ci
COPY . .

CMD [ "node", "server.js" ]
