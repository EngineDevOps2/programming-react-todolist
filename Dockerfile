# Use Node.js for building the React app  
FROM node:20 AS build  

# Set the working directory  
WORKDIR /app  

# Copy package.json and package-lock.json  
COPY package*.json ./  

# Install dependencies  
RUN npm install  

# Copy the rest of the application  
COPY . .  

# Build the React application  
RUN npm run build  

# Use Nginx to serve the React app  
# FROM nginx:alpine  
# COPY --from=build /app/build /usr/share/nginx/html  

# # Expose port 80  
 EXPOSE 3000  

# Start Nginx  
CMD ["npm", "start"]
