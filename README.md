# cloth-management

This repository contains the code of a Cloth Management API. <br/>
Tech Stack Used:

- `Node JS`
- `Express`
- `MongoDB`

The Code Structure of the repository is as follows:

```
├── controllers
│   ├── authController.js
│   └── clothController.js
├── models
│   ├── clothModel.js
│   └── userModel.js
├── postman_collection
├── public
│   └── images
├── routes
│   ├── clothRoutes.js
│   └── userRoutes.js
├── utils
│   └── uploadImage.js
├── .env
├── .env.example
├── .gitignore
├── app.js
├── LICENSE
├── package.json
├── README.md
├── server.js
└── yarn.lock

```

The API is deployed in [heroku](https://heroku.com)

The base url of the deployed API is : `http://cloth-management.herokuapp.com`

To run the project locally:

- Clone the repository
- Create .env file in the root of the repository and use the varaibles used in .env.example
- run the command `yarn`
- run `yarn start` to run the app locally

Standard MVC architecture has been used in this API. (View section is ignored as we are building the API for a mobile application).
The starting point of the application is `server.js` where we have connected the app to a mongo database.
Models folder contains the schemas and controllers are the brain part of the application.
All application and business logic is present there. The `routes` folder has been created separately
so that we can separate application logic and the paths to different endpoints.

The postman collection of the API can be found in the folder `postman_collection`
