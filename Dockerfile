FROM node:24-alpine AS base

ARG NEXT_TELEMETRY_DISABLED=1
ARG SKIP_ENV_VALIDATION=1
ARG ANALYZE=false

# Install pnpm
RUN npm install -g pnpm cross-env

# Install dependencies
FROM base AS deps

WORKDIR /app

COPY package.json pnpm-lock.yaml ./

RUN pnpm install --frozen-lockfile --ignore-scripts

# Build the app
FROM base AS builder

WORKDIR /app

COPY --from=deps /app/node_modules ./node_modules/
COPY . .

ENV NEXT_TELEMETRY_DISABLED=$NEXT_TELEMETRY_DISABLED
ENV SKIP_ENV_VALIDATION=$SKIP_ENV_VALIDATION
ENV ANALYZE=$ANALYZE

RUN pnpm run build --no-lint

# Final image
FROM base AS runner

WORKDIR /app

ENV NEXT_TELEMETRY_DISABLED=$NEXT_TELEMETRY_DISABLED
ENV NODE_ENV=production

# Copy necessary files
COPY --from=builder /app/next.config.ts ./
COPY --from=builder /app/package.json ./
COPY --from=builder /app/public ./public
COPY --from=builder /app/prisma ./prisma
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules

CMD ["npm", "start"]
