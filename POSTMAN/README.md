# testing api with POSTMAN

## Instructions

### Load the POSTMAN collection into POSTMAN.

The different endpoints should be tested in the order given by the collection; from top to bottom.

There are two variables that need to be set during the testing, in order for everything to work: 
* jwt 
* id  

See instructions below on how and where to set these.

## Setting variables during testing

### POST /auth/login - jwt
* At first login with the newly created user, paste the provided jwt into the collection variable named jwt, be sure to save it.
### POST /tandem/users - id
* After a tandem account has been created for that user, paste the id provided in the response into the collection variable named id, be sure to save it.



