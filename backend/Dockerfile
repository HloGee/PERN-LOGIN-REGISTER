# Use the official Node.js image
FROM node:22

# Create a working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the project
COPY . .

# Expose the backend port
EXPOSE 5000

# Start the server
CMD ["npm", "run", "dev"]