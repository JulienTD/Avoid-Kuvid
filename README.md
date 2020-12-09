# Avoid-Kuvid

[![CircleCI](https://circleci.com/gh/JulienTD/Avoid-Kuvid.svg?style=svg&circle-token=883a3d49dc6234ee0b76cc20d0a37768569c3044)](https://app.circleci.com/pipelines/github/JulienTD)

The project is composed of 2 modules:
- `api`: it contains the server and permits to receive request from the mobile application
- `app`: it contains the mobile application

## Getting started

### Setup the server and the database
Step 1: Have Docker installed on your computer.  
Step 2: Launch the database and the server by executing `docker-compose up --build`.  
Step 3: The server is now up and running at the address: [http:localhost:5000](http:localhost:5000)  

### Setup the mobile application
Step 1: Have `Node.js` and `npm` installed  
Step 2: Have `expo` installed (`npm install --global expo-cli`)  
Step 3: Install all dependencies by executing `npm ci`  
Step 4: Launch the mobile application by executing `npm run start`  
