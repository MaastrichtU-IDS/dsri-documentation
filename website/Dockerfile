# Build React website
FROM node:18-alpine AS build

RUN apk add --no-cache \
    autoconf \
    automake \
    libtool \
    make \
    g++ \
    bash

WORKDIR /app

COPY package.json yarn.lock ./

RUN yarn install --frozen-lockfile

COPY . /app

RUN yarn build:dev

# Serve with nginx
FROM nginx:alpine

COPY --from=build /app/build /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]