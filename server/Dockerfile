## Install server dependencies only when needed
# FROM node:alpine AS deps
# # Check https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine to understand why libc6-compat might be needed.
# # RUN apk add --no-cache libc6-compat

# WORKDIR /app
# COPY package.json yarn.lock ./
# RUN yarn install --frozen-lockfile


# ## Build React website
# FROM node:alpine AS build-react
# COPY searchkit-react /app
# WORKDIR /app
# RUN yarn install --frozen-lockfile
# RUN yarn build


## Build and run the server
FROM node:alpine

ENV NODE_ENV production
WORKDIR /app

RUN addgroup -g 1001 -S nodejs
RUN adduser -S nodejs -u 1001

# COPY server.ts package.json ./ 
COPY . ./ 
RUN chown -R nodejs:nodejs /app

# COPY --from=deps --chown=nodejs:nodejs /app/node_modules ./node_modules
# COPY --from=build-react --chown=nodejs:nodejs /app/build ./public


USER nodejs

EXPOSE 4000
CMD ["yarn", "serve"]
