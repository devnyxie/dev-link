# ----- Server -----
FROM node:18.17.0 as build

WORKDIR /base
#copy monorepo package.json and yarn.lock
COPY package.json .
COPY yarn.lock .
COPY .env .
#copy server code
COPY ./apps/server/package.json apps/server/
RUN yarn install
COPY ./apps/server apps/server
# Command to run your server
CMD ["yarn", "workspace", "server", "start"]