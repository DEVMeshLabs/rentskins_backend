FROM node:latest AS run
WORKDIR /src

COPY package*.json ./
RUN npm install --only=production

COPY . .

RUN npx prisma generate

EXPOSE 3000

CMD ["npm", "start"]