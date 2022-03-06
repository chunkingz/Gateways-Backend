FROM node:14

WORKDIR /app

COPY package*.json ./

COPY . .

RUN npm i

CMD ["npm", "start"]

EXPOSE 5000
