# ============================
# 1. Install dependencies
# ============================
FROM node:24-alpine AS deps

WORKDIR /app

# Install dependencies only when package files change
COPY package.json package-lock.json ./
RUN npm install --frozen-lockfile


# ============================
# 2. Build the Next.js app
# ============================
FROM node:24-alpine AS builder

WORKDIR /app

COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Build the Next.js project
RUN npm run build


# ============================
# 3. Run the production server
# ============================
FROM node:24-alpine AS runner

WORKDIR /app

ENV NODE_ENV=production

# Ensure nextjs can run properly
RUN addgroup -g 1001 nodejs && \
    adduser -S -u 1001 nextjs

# Copy the built app and minimal files
COPY --from=builder /app/next.config.js ./
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json

USER nextjs

EXPOSE 3000

# Start Next.js in production mode
CMD ["npm", "start"]
