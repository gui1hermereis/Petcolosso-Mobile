FROM node:latest
WORKDIR /home/node/app

COPY package.json ./
RUN yarn
RUN npm install bcrypt
COPY . .
RUN npx prisma generate
COPY ./dist .
