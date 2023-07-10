FROM node:latest
WORKDIR /src
COPY package*.json .
COPY . .
RUN npm ci && npm run build && npx prisma
EXPOSE 3333
CMD [ "npm", "run" "start"]