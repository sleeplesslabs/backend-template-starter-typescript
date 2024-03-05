FROM node:18.16.1 

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

COPY .env.example .env

RUN npm run build

EXPOSE 6969

CMD ["node", "dist/index.js"]