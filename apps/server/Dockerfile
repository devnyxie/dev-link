FROM node:20-alpine

# Set working directory
WORKDIR /app

# Copy package.json and install dependencies
COPY package.json yarn.lock ./
RUN yarn install

# Copy the rest of the application
COPY . .

# Copy the .env file to the container
COPY .env .env

# Expose the application port
EXPOSE 8080

# Command to run the application
CMD ["yarn", "start"]

