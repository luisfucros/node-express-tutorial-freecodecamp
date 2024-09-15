FROM node:slim

WORKDIR /app

# Install app dependencies
COPY app/package.json .
RUN npm install

COPY ./app .

# Expose the port the app runs on
EXPOSE 3000

CMD ["npm", "run", "dev"]