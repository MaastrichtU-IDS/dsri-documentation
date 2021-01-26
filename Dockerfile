FROM node:12

# Original Docusaurus image FROM node:8.11.4

WORKDIR /app/website

RUN yarn global add docusaurus

EXPOSE 3000 35729
# COPY ./docs /app/docs
COPY ./v4-website /app/website
RUN yarn install

CMD ["yarn", "run", "serve", "--build", "--port", "3000", "--host", "0.0.0.0"]
