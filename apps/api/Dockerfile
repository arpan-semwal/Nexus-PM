# Base stage
FROM node:18-alpine AS base

# Dependencies stage
FROM base AS deps
WORKDIR /app
# Hum root ki files copy kar rahe hain kyunki ye monorepo hai
COPY package.json package-lock.json* ./
RUN npm install

# Builder stage
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
# Note: Agar abhi build script nahi hai toh ye fail ho sakta hai, abhi ke liye skip bhi kar sakte ho
RUN npm run build

# Production stage
FROM base AS runner
WORKDIR /app
ENV NODE_ENV=production
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json

EXPOSE 5000
CMD ["node", "dist/main.js"]