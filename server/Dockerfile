# Use Node base image
FROM node:18

# Set working directory inside container
WORKDIR /app

# Copy only dependencies first (Docker layer caching)
COPY package.json package-lock.json ./
RUN npm install

# Copy the entire app
COPY . .

# Expose backend port
EXPOSE 5000

# Run the dev server (you can use nodemon if it's installed)
CMD ["npm", "run", "dev"]
