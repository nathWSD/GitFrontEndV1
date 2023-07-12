# Base image
FROM node:14-alpine

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy app source code
COPY . .

# Build the app
RUN npm run build

# Specify the port number the container should expose
EXPOSE 3000

# Set environment variables
ENV REACT_APP_BACKEND_URL=http://backend:8080

# Start the app
CMD ["npm", "start"]
