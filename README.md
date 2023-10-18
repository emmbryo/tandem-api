# tandem-api

This api is meant to be used to find a language tandem partner. You register your user and your languages and the hunt is on.


## Requirements for running the application
It requires an instance of mongoDB to run, for authentication and for the tandem data.

## Environmental variables 
The needed environmental variables are:

* DB_CONNECTION_STRING="mongodb://localhost:27017/your_path"
* PORT=8080
* BASE_URL='/'
* PUBLIC_KEY="the public key"
* PRIVATE_KEY="the private key"
* ACCESS_TOKEN_LIFE='24h'
* FIRE_WEBHOOK_AUTH="a secret string"
* NODE_ENV='development'


## Start the API
* npm install
* Start MongoDB 
* npm run dev