# Use the official Node.js 14 image
FROM node:14

# Set the working directory in the container
WORKDIR /UniUnity

# Copy package.json and package-lock.json to the working directory
COPY UniUnity/app/package*.json UniUnity/app/

# Install dependencies
RUN npm install

# Copy the application code to the working directory
COPY / /UniUnity

# Expose the port that the application will run on
EXPOSE 5000

# Command to run the application
CMD ["node", "./app/bin/www.js"]

