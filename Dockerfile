# Use an official Node.js runtime as the base image
FROM node:20.4.0

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies
RUN npm ci

# Copy the entire application to the working directory
COPY . .

# Build the application
RUN npm run build

# Expose the desired port (optional)
EXPOSE 3000

# Define the command to run the application
CMD [ "npm", "start" ]