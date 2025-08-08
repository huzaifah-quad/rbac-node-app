# Use official Node.js LTS image
FROM node:18 as build

# Set working directory
WORKDIR /app

# Copy dependencies and install
COPY package*.json ./
RUN npm install

# Copy source code and build
COPY . .
RUN npm run build

# ---- Serve with Nginx ----
FROM nginx:alpine

# Copy built app to Nginx public folder
COPY --from=build /app/build /usr/share/nginx/html

# Copy default nginx config (optional)
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose Nginx port
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]
