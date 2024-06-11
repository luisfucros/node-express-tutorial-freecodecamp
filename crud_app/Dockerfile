FROM node:slim

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
COPY package*.json ./
RUN npm install

# Bundle app source
COPY . .

# Install nodemon globally
RUN npm install -g nodemon

# Expose the port the app runs on
EXPOSE 3000

# Command to run the app using nodemon
CMD ["npm", "run", "dev"]