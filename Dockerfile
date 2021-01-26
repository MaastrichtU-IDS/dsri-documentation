FROM node:14

WORKDIR /app/website

COPY ./v4-website /app/website
RUN yarn install

EXPOSE 3000

ENTRYPOINT ["yarn", "serve", "--build", "--port", "3000", "--host", "0.0.0.0"]
