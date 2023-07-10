FROM node:latest
WORKDIR /src
COPY package*.json .
RUN npm install --quiet --no-optional --no-fund --loglevel=error
COPY . .
RUN npm run build
EXPOSE 3333
CMD [ "npm", "run" "start"]