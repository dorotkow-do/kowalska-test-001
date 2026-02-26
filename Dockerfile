# Use the official Microsoft Playwright image
# It includes Node.js and all the necessary browser binaries and OS dependencies
FROM mcr.microsoft.com/playwright:v1.58.2-jammy

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json
# Doing this first allows Docker to cache the npm install step
COPY package*.json ./

# Install project dependencies
RUN npm ci

# Copy the rest of your application code
COPY . .

# Command to run Playwright tests when the container starts
CMD ["npx", "playwright", "test"]
