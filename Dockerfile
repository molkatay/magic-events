# Use Node 18 Alpine base image
FROM node:18-alpine as base

WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install

# Expose application port
EXPOSE 3000

# Builder stage
FROM base as builder
WORKDIR /app
COPY . .
RUN npm run build

# Production stage
FROM base as production
WORKDIR /app

# Set environment variable
ENV NODE_ENV=production

# Create a non-root user and group
RUN addgroup -g 1001 -S nodejs && adduser -S nextjs -u 1001 -G nodejs

# Set ownership and permissions for /app directory and files
RUN chown -R nextjs:nodejs /app

USER nextjs

# Copy built files from builder stage and set ownership
COPY --from=builder --chown=nextjs:nodejs /app/.next ./.next
COPY --from=builder --chown=nextjs:nodejs /app/node_modules ./node_modules
COPY --from=builder --chown=nextjs:nodejs /app/package.json ./package.json
COPY --from=builder --chown=nextjs:nodejs /app/public ./public

CMD ["npm", "start"]

# Development stage
FROM base as dev
ENV NODE_ENV=development

# Install build tools as root
USER root
RUN apk add --no-cache g++ make py3-pip libc6-compat curl

# Create a non-root user and group
RUN addgroup -g 1001 -S nodejs && adduser -S nextjs -u 1001 -G nodejs

# Set ownership for /app directory
RUN chown -R nextjs:nodejs /app

USER nextjs

# Install npm packages
COPY --chown=nextjs:nodejs package*.json ./
RUN npm install

# Copy the rest of the application files and set ownership
COPY --chown=nextjs:nodejs . .

# Start the development server
CMD ["npm", "run", "dev"]
