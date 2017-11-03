FROM node:alpine

COPY ./.build/ /srv/

WORKDIR /srv/
ENV NODE_ENV=production
RUN npm install --no-save \
  micro

CMD ["./node_modules/.bin/micro", "./index.js"]
