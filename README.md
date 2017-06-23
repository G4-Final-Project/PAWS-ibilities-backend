# PsudeoPet-backend

### Contributers: Carlo Santos, James Thomas, Maria Lee-Reid, Patrick Sheridan

CodeFellows 401 JavaScipt final project RESTful API backend.

## Overview
An API for the PseudoPet front end. To hit these routes, run locally, npm install all our dependecies. Then in one terminal window start a mongod server with 
```
mongod --dbpath ./db 
```
Then in a seond window run 
```
nodemon server.js
```
You should then have a runnin instance of the app locally.


## Routes
```
http://localhost:3000/
```
## Parent Routes
#### Parent Signup/POST Route
```
/api/user

```
#### Parent Login/GET Route
```
/api/user
```
#### Parent Update/PUT Route
```
/api/user
```
#### Parent Delete/DELETE Route
```
/api/user
```

## Child Routes
#### Child Create/POST Route
```
/api/child
```
#### Child Update/PUT Route
```
/api/child/:childId
```
#### Child GET/GET Route
```
/api/child/:childId
```
### Child getALL/GET Route
```
/api/child
```
#### Child Delete/DELETE Route
```
/api/child/:childId
```
## Pet Routes
#### Pet Create/POST Route
```
/api/child/:childId/pet
```
#### Pet Update/PUT Route
```
/api/child/:childId/pet
```
#### Pet GET/GET Route
```
/api/child/:childId/pet
```
#### Pet Delete/DELETE Route
```
/api/child/:childId/pet
```
