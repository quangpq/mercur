FROM node:lts

RUN corepack enable && corepack prepare yarn@3.8.7 --activate

WORKDIR /app
RUN mkdir /app/mercur
COPY . /app/mercur

WORKDIR /app/mercur
RUN yarn install
RUN yarn generate:oas
RUN yarn codegen

WORKDIR /app/mercur/apps/backend
RUN yarn build

WORKDIR /app/mercur/apps/backend/.medusa/server
RUN yarn install

COPY docker-entrypoint.sh /app/

WORKDIR /app/mercur/apps/backend
ENTRYPOINT ["/app/docker-entrypoint.sh"]
