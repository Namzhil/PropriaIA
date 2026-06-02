FROM node:20-bookworm-slim AS builder
WORKDIR /app
COPY package.json package-lock.json ./
RUN NODE_OPTIONS="--max-old-space-size=768" npm install --maxsockets 1
COPY . .
RUN npm run build

FROM node:20-bookworm-slim AS runner
WORKDIR /app
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

RUN addgroup --system --gid 1001 appgroup && \
    adduser --system --uid 1001 appuser

COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static

RUN chown -R appuser:appgroup /app

USER appuser

EXPOSE 3000

ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

CMD ["node", "server.js"]
