FROM node:latest
WORKDIR /src
COPY package*.json .
RUN npm ci --production
COPY . .
COPY ./.env.production ./.env
RUN npm run build
EXPOSE 3333
CMD [ "npm", "run" "start"]