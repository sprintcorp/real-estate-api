# Real Estate API using Node.js, Express.js, and Cloudinary

This repository contains a Real Estate API built using Node.js, Express.js, and Cloudinary tools. The API allows you to manage real estate listings, images, and related data.

## Features

- Create, Read, Update, and Delete real estate listings
- Upload and manage property images using Cloudinary
- Well-organized folder structure for easy development and maintenance
- Middleware for authentication and request validation

## Folder Structure

    ├── config/
    │ ├── config.env
    │ └── db.js
    ├── controller/
    │ ├── auth.js
    │ └── category.js
    | └── house.js
    | └── rating.js
    | └── user.js
    | └── userhouse.js
    ├── route/
    │ ├── auth.js
    │ └── category.js
    | └── house.js
    | └── rating.js
    | └── user.js
    | └── userhouse.js
    ├── model/
    │ ├── Category.js
    │ ├── House.js
    │ └── Rating.js
    │ ├── User.js
    │ └── UserHouse.js
    ├── middlewares/
    │ ├── advancedresults.js
    │ └── async.js
    │ └── auth.js
    │ └── error.js
    │ └── search.js
    ├── utils/
    │ ├── errorResponse.js
    │ └── geocode.js
    │ └── helper.js
    │ └── mail.js
    │ └── multer.js
    │ └── upload.js
    ├── package-lock.json
    ├── package.json
    ├── server.js
    ├── .gitignore
    └── README.md


## Setup

1. Clone the repository:

   ```bash
   git clone https://github.com/sprintcorp/real-estate-api.git
   cd real-estate-api

2. Run `npm install`

3. Configure Cloudinary credentials, database, emial in config/config.env

4. Run the application: `npm run dev`

