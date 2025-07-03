# Stage 1: Build the application
FROM node:22-alpine AS build

WORKDIR /app

# Copy package.json and package-lock.json (or yarn.lock)
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy source code
COPY . .

# Compile TypeScript
RUN npm run build

# Stage 2: Create the production image
FROM node:22-alpine AS production

WORKDIR /app

# Copy only necessary files from the build stage
COPY --from=build /app/package*.json ./
COPY --from=build /app/node_modules/ ./node_modules/
COPY --from=build /app/dist/ ./dist/

# Expose the application port (if applicable)
EXPOSE 3000

# Define the command to run the application
CMD ["node", "dist/infra/http/server.mjs"]