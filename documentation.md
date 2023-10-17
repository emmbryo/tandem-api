# Language tandem partner API

This is an overview for the endpoints of the language tandem api. WHich http verbs that goes to which endpoint and what parameters that are required.

For the tandem and webhooks endpoint you need to be an authenticated, sometimes authorized, user. This is done by providing an jwt that is generated on login to /auth/login. This is sent as a bearer token:
````
method: 'POST',
headers: {
  content-type: 'application/json',
  Authentication: 'Bearer [the jwt (as a string)]'
}

````

## 404 error
For all endpoints it is possible to receive a 404 not found, if the api is offline or otherwise unreachable. All other response codes are described below, for each endpoint.

## /auth endpoints
![auth api](/images/auth-api.png)

## /tandem endpoints
![tandem api](/images/tandem-api.png)

## /webhooks endpoints
![webhooks api](/images/webhooks-api.png)

## Query parameters
![query](/images/query-params.png)
### Query example:
````
{{baseURL}}/tandem/users?language=eng&level=C2&limit=5

````
This filters out the 5 first users who speak english at C2 level.

## Body parameters
### 1a - POST to /auth/register 
![user reg](/images/user-reg.png)
### 1b - POST to /auth/login 
![user login](/images/user-login.png)
### 1c - DELETE to /auth/users/:id 
![user login](/images/user-login.png)
### 2a - POST to /tandem/users
![tandem reg](/images/req_body.png)
### 2b - PUT to /tandem/users/:id 
![tandem reg](/images/req_body.png)
### 2c - PATCH to/tandem/users/:id 
![tendem patch](/images/tandem-update.png)
### 3 - POST to /webhokks/register
![webhook reg](/images/webhook-reg.png)