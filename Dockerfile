FROM node:latest
WORKDIR /src
COPY package*.json .
RUN npm ci --production
COPY . .
RUN npm run build
CMD [ "npm", "run" "start"]