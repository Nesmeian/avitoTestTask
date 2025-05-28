FROM node:22

WORKDIR /app


COPY package*.json ./


RUN npm install


COPY . .


EXPOSE 5173 3000


CMD ["npm", "run", "dev"]