# Step 1: Dependencies stage
FROM node:20-alpine AS base
FROM base AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci

# Step 2: Build stage
FROM base AS builder
WORKDIR /app
<<<<<<< Updated upstream

# Build arguments
ARG NEXT_TELEMETRY_DISABLED=1
ARG NEXT_SKIP_PREFETCH=1
ARG NEXT_BUILD_STANDALONE=true 
ARG NEXT_PUBLIC_IMAGE_CLOUDFRONT
ENV NEXT_PUBLIC_IMAGE_CLOUDFRONT=$NEXT_PUBLIC_IMAGE_CLOUDFRONT

# Copy dependencies from deps stage
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Build the application
=======
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# RUN npm ci
>>>>>>> Stashed changes
RUN npm run build

# Production image, copy all the files and run next
FROM base AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Automatically leverage output traces to reduce image size
# https://nextjs.org/docs/advanced-features/output-file-tracing
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3001

ENV PORT=3001

# server.js is created by next build from the standalone output
# https://nextjs.org/docs/pages/api-reference/config/next-config-js/output
ENV HOSTNAME="0.0.0.0"
CMD ["node", "server.js"]