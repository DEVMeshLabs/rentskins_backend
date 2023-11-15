FROM node:latest

WORKDIR /app

# Copie o arquivo de configuração do projeto e instale as dependências
COPY package.json ./
COPY package-lock.json ./
COPY tsconfig.json ./
COPY ./prisma ./prisma

RUN npm ci

COPY . .

RUN npm run build

EXPOSE 3333

CMD [ "npm", "build" ]
