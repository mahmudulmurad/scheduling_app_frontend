FROM node:18.17.0-alpine

WORKDIR /usr/src/app
COPY package*.json ./

RUN npm install -g npm@latest
RUN npm install

COPY . .
RUN npm run build

EXPOSE 3000

ENV REACT_APP_BACKEND_URL http://localhost:3020/api/v1

CMD ["npm", "start"]
