# ----- Client -----
FROM node:18.17.0 as build

WORKDIR /base
#copy monorepo package.json and yarn.lock
COPY package.json .
COPY yarn.lock .
#copy client code
COPY ./apps/client/package.json apps/client/
RUN yarn install
COPY ./apps/client apps/client
#build client
RUN yarn workspace client build
#start built client
FROM nginx:stable-alpine
ARG BUILD_CONTEXT
COPY --from=build /base/apps/client/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
#copy port arg into .env
# ARG CLIENT_PORT
# RUN if [ -n "$CLIENT_PORT" ]; then echo "CLIENT_PORT=$CLIENT_PORT" > .env; fi
CMD ["nginx", "-g", "daemon off;"]
