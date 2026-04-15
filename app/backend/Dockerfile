# STAGE 1: Build & Dependency Install
FROM node:20.11.1-alpine3.19 AS builder
WORKDIR /app
COPY package*.json ./
# Use npm ci for exact version matching from your lockfile
RUN npm ci --omit=dev

# STAGE 2: Final Runtime Image
FROM node:20.11.1-alpine3.19
WORKDIR /app

# Copy ONLY the necessary production artifacts from the builder
COPY --from=builder /app/node_modules ./node_modules
COPY . .

# Security: Create user and set permissions
RUN addgroup -S appgroup && \
    adduser -S appuser -G appgroup && \
    chown -R appuser:appgroup /app

USER appuser
EXPOSE 5001

HEALTHCHECK --interval=10s --timeout=5s --start-period=15s --retries=5 \
  CMD wget --no-verbose --tries=1 --spider http://127.0.0.1:5001/health || exit 1
# Use JSON format for CMD to ensure signals (SIGTERM) are passed correctly to Node
CMD ["node", "index.js"]