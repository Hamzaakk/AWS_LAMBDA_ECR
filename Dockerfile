# Use the official AWS Lambda Node.js 16 runtime as a base image
FROM public.ecr.aws/lambda/nodejs:16

# Set the working directory
WORKDIR /var/task

# Copy package.json and package-lock.json to the working directory
COPY package.json package-lock.json ./

# Install dependencies
RUN npm install  # Use npm install instead of npm ci

# Copy the rest of the application code
COPY dist/ .

# Set the CMD to the function handler
CMD ["index.handler"]
