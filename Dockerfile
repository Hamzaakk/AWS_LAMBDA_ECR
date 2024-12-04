# Use the official Node.js image
FROM node:18-alpine

# Set the working directory
WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install --production

# Copy the rest of the application code
COPY . .

# Build the application
RUN npm run build

# Set the Lambda environment variables
ENV AWS_REGION=us-east-1

# Command to run the application
CMD ["node", "dist/index.js"]
