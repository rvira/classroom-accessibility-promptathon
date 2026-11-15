# Multi-stage production build for Bullseye Classroom Accessibility Layer
# syntax=docker/dockerfile:1

# ==============================================================================
# Stage 1: Build Frontend SPA
# ==============================================================================
FROM node:22-alpine AS frontend-builder
WORKDIR /app
COPY app/package*.json ./
RUN npm ci || npm install
COPY app/ ./
RUN npm run build

# ==============================================================================
# Stage 2: Build Backend Server
# ==============================================================================
FROM node:22-alpine AS backend-builder
WORKDIR /server
COPY server/package*.json ./
RUN npm ci || npm install
COPY server/ ./
RUN npm run build

# ==============================================================================
# Stage 3: Production Backend Service
# ==============================================================================
FROM node:22-alpine AS backend
WORKDIR /server
ENV NODE_ENV=production
COPY server/package*.json ./
RUN npm ci --omit=dev || npm install --omit=dev
COPY --from=backend-builder /server/dist ./dist
USER node
EXPOSE 4000
CMD ["node", "dist/index.js"]

# ==============================================================================
# Stage 4: Production Frontend Service (Nginx)
# ==============================================================================
FROM nginx:alpine AS frontend
COPY --from=frontend-builder /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
