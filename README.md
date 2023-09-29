# Introduction
Streaming website where you can watch your favorite movie or series tv, comment and rate it. Implemented during the Umana bootcamp as final project.

# Technologies

Use NodeJS 14 to make it works.

Implemented with the following technologies:
- API doc: OpenAPI
- Backend: Typescript NodeJS Express
- Frontend: Typescript Angular
- Database: MySQL

# Features

Current features:
- Retrieve movies and series tv from the database
- Add and remove movies/seriesTv to favorites if logged in

# Installation

## Database
The database has to be initialized before using the app. It has to be MySQL.

## Backend
1. Go inside the `backend` folder
2. Run `npm install`
3. Create a `.env` inside the folder backend with the following info:
```
# the port you want to use for the backend
APP_PORT=

# the mysql datatabase settings
MYSQL_HOST=
MYSQL_PORT=
MYSQL_USER=
MYSQL_PASS=
MYSQL_DB=
```
4. Run `npm start` to make the backend start

### Notes
The default backend port is 3000 defined in the `netflop.yaml`. if you want to change it:
- update the `APP_PORT` variable in the backend `.env`
- edit the `netflop.yaml`, under `servers` `url`, edit the url with the port that you want to use
- in the frontend re-run the `npm run generate:api`

## Frontend
1. Go inside the `frontend` folder
2. Run `npm install`
3. Run `npm start` to make the backend start (if a problem occurs, check that the version of NodeJS is 14)

# Developer notes
The project communication between frontend and backend is managed with OpenAPI generator. If you want to make any changes to the models or the APIs, you would need to edit the `netflop.yaml`. The backend use only the models, while the APIs are defined inside the `backend/src/controllers` folder and they are not autogenerated.

To autogenerate the frontend APIs and models, from inside the frontend folder, run `npm run generate:api`
To autogenerate the backend models, from inside the backend folder, run `npm run generate:api`

