FROM node:alpine

WORKDIR /app

COPY ./backend/package.json ./backend/package-lock.json /app/

RUN npm i --production

COPY ./backend /app
COPY ./frontend/build /app/public

EXPOSE 4000

ENTRYPOINT npm run prod 