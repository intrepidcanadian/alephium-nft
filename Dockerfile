# Install dependencies only when needed
FROM node:alpine AS deps
# Check https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine to understand why libc6-compat might be needed.
RUN apk add --no-cache libc6-compat
WORKDIR /app
COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile

# Rebuild the source code only when needed
FROM node:alpine AS builder
WORKDIR /app
COPY . .
COPY --from=deps /app/node_modules ./node_modules
ARG NODE_ENV=development
RUN echo ${NODE_ENV}
RUN NODE_ENV=${NODE_ENV} yarn build

# Production image, copy all the files and run next
FROM node:alpine AS runner
WORKDIR /app
RUN addgroup -g 1001 -S nodejs
RUN adduser -S nextjs -u 1001

# You only need to copy next.config.js if you are NOT using the default configuration
COPY --from=builder /app/next.config.js ./next.config.js
COPY --from=builder /app/public ./public
COPY --from=builder /app/configs ./configs
COPY --from=builder /app/scripts ./scripts
COPY --from=builder /app/contracts ./contracts
COPY --from=builder /app/artifacts ./artifacts
COPY --from=builder /app/styles ./styles
COPY --from=builder /app/utils ./utils
COPY --from=builder --chown=nextjs:nodejs /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/pages ./pages

USER nextjs

# Expose
EXPOSE 3000

ENV NEXT_TELEMETRY_DISABLED 1
CMD ["yarn", "start"]