# Use official Node.js LTS image
FROM node:22-alpine

# Set working directory
WORKDIR /usr/src/app

# Copy package.json and install dependencies
#RUN rm -rf node_modules package-lock.json
#COPY package*.json ./
#RUN npm install -g npm@11.5.2
#RUN npm install

# Copy all other source files
COPY . .
# Copy the entrypoint script
COPY docker-entrypoint.sh /usr/local/bin/docker-entrypoint.sh
RUN chmod +x /usr/local/bin/docker-entrypoint.sh
RUN chmod +x /usr/src/app/initDB.js

# Expose backend port
EXPOSE 4000

# Start the server`
#CMD ["npm","initDB", "npm", "start"]
ENTRYPOINT ["/usr/local/bin/docker-entrypoint.sh"]
