# Build stage
FROM node:22-alpine AS builder

# Set working directory
WORKDIR /app

# Enable pnpm
RUN corepack enable pnpm && corepack prepare pnpm@latest --activate

# Copy package manager files
COPY package.json pnpm-lock.yaml ./

# Install dependencies
RUN pnpm i --frozen-lockfile

# Copy the rest of the project to the container
COPY . .

# Build the Next.js app
RUN pnpm run build; 

# Production image, copy all the files and run next
FROM node:22-alpine AS runner

# Set working directory
WORKDIR /app

# Set environment variables
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

# Create a non-root user for security
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Copy necessary files for production
COPY --from=builder /app/package.json ./
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules

# Set user permissions
USER nextjs

# Expose the app's port
EXPOSE 3000
ENV PORT=3000

# Start the Next.js production server
CMD ["node", "node_modules/next/dist/bin/next", "start"]
