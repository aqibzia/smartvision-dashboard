# Use Node.js LTS
FROM node:18

# Set working directory inside container
WORKDIR /app

# Copy package.json and install deps
COPY package.json package-lock.json ./
RUN npm install

# Copy the rest of the app
COPY . .

# Expose Vite dev server port
EXPOSE 5173

# Run the dev server
CMD ["npm", "run", "dev"]
