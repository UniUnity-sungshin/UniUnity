# Use the official Node.js 14 image
FROM node:14

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY app/package*.json /app/

# Install dependencies
RUN npm install

# Copy the application code to the working directory
COPY app /app

# Expose the port that the application will run on
EXPOSE 3000

# Command to run the application
CMD ["node", "./bin/www.js"]

