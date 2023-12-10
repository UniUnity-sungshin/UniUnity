# Use the official Node.js 14 image
FROM node:14

# Set the working directory in the container
WORKDIR /UniUnity

# Copy package.json and package-lock.json to the working directory
COPY app/package*.json /UniUnity/app/

# Change the working directory to /UniUnity/app
WORKDIR /UniUnity/app

# Install dependencies
RUN npm install

# Change the working directory back to /UniUnity
WORKDIR /UniUnity

# Copy the application code to the working directory
COPY / /UniUnity

WORKDIR /UniUnity/app

ENV PORT 5000
# Expose the port that the application will run on
EXPOSE 5000

# Command to run the application
CMD ["node", "./app/bin/www.js"]
