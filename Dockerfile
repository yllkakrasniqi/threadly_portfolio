FROM node:latest

WORKDIR /yllka07/threadly/portfolio

COPY package*.json ./

RUN npm install

COPY . ./

EXPOSE 3003

CMD [ "npm", "start" ]