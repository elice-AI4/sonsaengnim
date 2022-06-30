FROM node:16-alpine3.15

# 이미지를 띄운다 => 서버를 띄운다 폴더를 지정해준다.
WORKDIR /user/src

COPY package*.json ./

RUN yarn install

COPY . .

RUN yarn build

# 앞에 인자를 뒤에 복사한다.
COPY .env ./

EXPOSE 5000

CMD [ "yarn", "start" ]
