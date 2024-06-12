FROM node:18-alpine as base
#RUN apk add --no-cache g++ make py3-pip libc6-compat
WORKDIR /app
COPY package*.json ./
EXPOSE 3000

FROM base as builder
WORKDIR /app
COPY . .
RUN npm run build

FROM base as production
WORKDIR /app

ENV NODE_ENV=production
RUN npm ci

# Create a non-root user
RUN addgroup -g 1001 -S nodejs && adduser -S nextjs -u 1001 -G nodejs

# Set ownership for /app directory
RUN chown -R nextjs:nodejs /app

USER nextjs

COPY --from=builder --chown=nextjs:nodejs /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/public ./public

CMD npm start

# Add dev stage
FROM base as dev
ENV NODE_ENV=development

# Install packages as root
USER root
RUN apk add --no-cache g++ make py3-pip libc6-compat
RUN apk --no-cache add curl

RUN addgroup -g 1001 -S nodejs && adduser -S nextjs -u 1001 -G nodejs
# Set ownership for /app directory
RUN chown -R nextjs:nodejs /app
USER nextjs


# Install npm packages
RUN npm install

# Copy the rest of the files
COPY . .

# Start the development server
CMD npm run dev
