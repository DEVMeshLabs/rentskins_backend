FROM node:latest
WORKDIR /src
COPY package*.json .
COPY . .
RUN npm ci
RUN npm run build
RUN npx prisma migrate deploy
EXPOSE 3333
CMD [ "npm", "run" "start"]