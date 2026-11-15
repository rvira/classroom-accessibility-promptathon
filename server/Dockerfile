# Production Dockerfile for Bullseye Backend Service
FROM node:22-alpine AS builder
WORKDIR /server
COPY package*.json tsconfig.json ./
RUN npm ci || npm install
COPY src/ ./src
RUN npm run build

FROM node:22-alpine AS runner
WORKDIR /server
ENV NODE_ENV=production
COPY package*.json ./
RUN npm ci --omit=dev || npm install --omit=dev
COPY --from=builder /server/dist ./dist
USER node
EXPOSE 4000
CMD ["node", "dist/index.js"]
