# Base stage: Install dependencies
FROM node:16-alpine AS base
RUN apk add --no-cache libc6-compat
WORKDIR /app/frontend
COPY ./frontend/package*.json ./frontend/yarn.lock ./
RUN yarn install --frozen-lockfile

# Build stage: Build the app
FROM base AS build
COPY ./frontend /app/frontend/
RUN yarn build


EXPOSE 3000

CMD [ "npx", "serve", "build" ]