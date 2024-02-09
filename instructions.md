Locally, we need to start Docker image with Port arg.
Inside of a Dockerfile (if arg) then we pass variables from arg to env file.
Remotely, we don't need to do such hustle.

Development:
Set env variables:
export CLIENT_PORT=3000 && echo "CLIENT_PORT=$CLIENT_PORT" >> .env; export SERVER_PORT=8080 && echo "SERVER_PORT=$SERVER_PORT" >> .env
source ~/.bashrc
Start client:
yarn client:dev
Start server: 1. Add DB_URL in .env file. 2. yarn server:dev
Docker:
Start docker:
systemctl start docker
Docker-compose:
Build all:
docker-compose build
Run all:
docker-compose up

Development:
  - Set env variables:
    ```bash
    export CLIENT_PORT=3000 && echo "CLIENT_PORT=$CLIENT_PORT" >> .env; export SERVER_PORT=8080 && echo "SERVER_PORT=$SERVER_PORT" >> .env
    source ~/.bashrc
    ```
  - Start client:
    ```bash
    yarn client:dev
    ```
  - Start server:
    1. Add DB_URL in .env file.
    2. ```bash
      yarn server:dev
      ```
  - Docker:
    Start docker:
      ```bash
      systemctl start docker
      ```
    Docker-compose:
      Build all:
        ```bash
        docker-compose build
        ```
      Run all:
        ```bash
        docker-compose up
        ```
