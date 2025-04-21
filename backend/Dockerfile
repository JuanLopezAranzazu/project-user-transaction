FROM node:18

WORKDIR /usr/src/app

COPY package.json package-lock.json ./
RUN npm install

COPY . .

RUN npm run tsc

EXPOSE 3000

CMD ["sh", "-c", "npm run db:deploy && npm run start"]