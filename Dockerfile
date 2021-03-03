FROM node:14

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

ENV NODE_ENV production

EXPOSE 8080

CMD ["node", "dist/index.js"]