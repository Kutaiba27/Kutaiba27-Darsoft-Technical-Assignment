
# Configuration App 

## Installation Dependencies

```bash
$ npm install
```


## Setting The Environment Variables
1. Create file with name "config.dev.env"
2. Add this variable :
- SERVER_PORT = 5000
- MONGO_DB_URL= "mongodb://127.0.0.1:27017/DarSfotTest"
- MONGO_DB_URL="mongodb://127.0.0.1:27017/DarSfotTest"
- JWT_SECRET_KEY="jwt-secret-for-test"
- JWT_EXPIRATION="9d"

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

```
