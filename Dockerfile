FROM node:latest

ENV TZ="Asia/Jakarta"

ENV NODE_OPTIONS="--max-old-space-size=4096"

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build
RUN chmod +x ./run.sh

EXPOSE 3000

CMD ["./run.sh"]