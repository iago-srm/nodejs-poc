FROM node:14

WORKDIR /app

COPY package*.json ./

RUN npm install --only=prod

COPY . .

RUN npm run build

ENV NODE_ENV production

EXPOSE 3000

CMD ["node", "dist/index.js"]