# Use the official Node.js image from Docker Hub
FROM node:latest

WORKDIR /app

# Copie o arquivo de configuração do projeto e instale as dependências
COPY package.json ./
COPY package-lock.json ./
COPY tsconfig.json ./
COPY ./prisma ./prisma

RUN npm ci

# Copie os arquivos do aplicativo
COPY . .

# Execute o comando de construção do aplicativo
RUN npm run build

# Exponha a porta que seu aplicativo está ouvindo
EXPOSE 3333

# Comando para iniciar o aplicativo
CMD [ "npm", "build" ]

# FROM node:latest

# WORKDIR /app

# COPY package*.json ./

# COPY . .

# RUN npm ci &&
# RUN npm run build
# RUN npx prisma migrate deploy

# EXPOSE 3333

# CMD [ "npm", "run", "build"]

