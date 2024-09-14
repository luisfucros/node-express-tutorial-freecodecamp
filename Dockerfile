FROM node:slim

# Create app directory
WORKDIR /app

# Install app dependencies
COPY app/package.json .
RUN npm install

# Bundle app source
COPY ./app .

# Install nodemon globally
RUN npm install -g nodemon

# Expose the port the app runs on
EXPOSE 3000

# Command to run the app using nodemon
CMD ["npm", "run", "dev"]