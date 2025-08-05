FROM node:18

# Create app directory
WORKDIR /app

# Install app dependencies
COPY package*.json ./
RUN npm install

# Copy source files
COPY . .

RUN npm install --save-dev vite

# Set permissions
RUN chown -R node:node /app

# Switch to non-root user
USER node

# Expose Vite dev port
EXPOSE 5173

# Start dev server
CMD ["npm", "run", "dev"]
