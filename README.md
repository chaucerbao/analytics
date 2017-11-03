# Analytics
A stand-alone analytics server inside a [Docker] container

## Setup
This application requires you to have [Docker] installed.

1. Install the dependencies
    ```
    npm install
    ```

2. Create a Docker Volume for the [CouchDB] data
    ```
    docker volume create couchdb
    ```

## Development
1. Compile the source and watch for changes, then starts a [CouchDB] server at http://127.0.0.1:5984/
    ```
    npm start
    ```

## Production
1. Build the application into a Docker container
    ```
    npm run build
    ```

2. Start the application server
    ```
    npm run serve
    ```

[CouchDB]: https://couchdb.apache.org/
[Docker]: https://www.docker.com/
