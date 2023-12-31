FROM node:13.7.0

WORKDIR /app

RUN npm update npm
RUN npm install -g gulp@latest
RUN npm install -g webpack@latest
RUN npm install -g webpack-cli@latest
RUN npm install -g pug@latest

COPY . ./

RUN npm install

CMD npm run w
