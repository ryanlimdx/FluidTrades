# Fluid Trades

A [web platform](https://fluidtrades.netlify.app) for casual and investors alike to consolidate their investments in one place. Developed using the MERN (MongoDB, Express, React, Node) tech stack.

## Credits
[Twelve Data API on RapidAPI](https://rapidapi.com/twelvedata/api/twelve-data1/), which provided us with real time data on charts and prices of assets. 

[Ed Roh](https://www.youtube.com/watch?v=wYpCWwD1oz0), whose youtube video we referenced to achieve theme support for our platform. 

## Team Members
Wang Helin

Ryan Lim Ding Xuan

## Documentation
Access our documentation on Google Docs [here](https://docs.google.com/document/d/1gCoxk-lQIpuvIV7AXtsrBCL8j1hDQhX6AdY5lXQm_a8/edit?usp=sharing).

## Running the application locally
### Step 1. Clone the repository

Fork the repository, then clone the repository locally by doing

```
  git clone git@github.com:ryanlimdx/FluidTrades.git
```
  
### Step 2. Install Dependencies
In the root folder, do npm install (to install concurrently)

```
  npm install
```

Then, do npm run build, to collectively install all dependencies for both frontend/backend

```
  npm run build
```

Alternatively, you can install the dependencies separately by doing cd client/server and doing npm install

### Step 3. Setup .env

To run the server you need to provide the .env variables:

1. Create a new .env file in the server folder

2. Open the [.env.example] file in the server/config folder

3. Copy the contents and paste it into the .env file with valid keys

### Step 4. Run the application

With everything properly set up, you should be good to go! From the root directory, do npm start to run both front/backend at once

Alternatively, you can run them separately by doing cd client/server and doing npm start

```
  npm start
```
