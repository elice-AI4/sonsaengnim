FROM node:16

WORKDIR /back

COPY package.json .

RUN yarn install

COPY . ./

EXPOSE 5000

CMD ["node", "index.ts"]