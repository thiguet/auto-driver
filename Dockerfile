FROM node:alpine

RUN apk update && apk add build-base git python

RUN apk add --no-cache --virtual .persistent-deps \
        curl \
        openssl \
        make \
        gcc \
        g++ \
        python \
        py-pip \
    && npm install --silent --save-dev -g \
        typescript \
        @types/node \
        ts-node

WORKDIR /app

COPY package.json .
COPY package-lock.json .

RUN npm i

COPY ./src ./src
COPY ./* ./

RUN npm run build

EXPOSE 8081
ENV PORT 8081
ENV NODE_ENV production

CMD ["node", "dist/index.js"]
