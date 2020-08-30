const express = require("express");
const dotenv = require("dotenv");
const morgan = require('morgan');
// const fileUpload = require('express-fileupload');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const bodyParser = require('body-parser');
const hpp = require('hpp');
const helmet = require("helmet");
const cors = require('cors');
const connectDB = require('./config/db');
const errorHandler = require('./middleware/error');
// const fs = require('fs')


//Load env vars
dotenv.config({ path: "./config/config.env" });

const app = express();
//Enable CORS
app.use(cors());
// Connect to database
connectDB();

// Sanitize data
app.use(mongoSanitize());

//Set security header
app.use(helmet());
//Prevents XSS Attack
app.use(xss());

//Prevent http param pollution
app.use(hpp());

//Body parser
// app.use(express.json());
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }));

//Dev logging middleware
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}
//Routes definition
const category = require("./routes/category");
const house = require("./routes/house");
const auth = require("./routes/auth");
const user = require("./routes/user");
const userhouse = require("./routes/userhouse");
const rating = require("./routes/rating");





// app.use(fileUpload());

//Mount routes
app.use("/api/v1/categories", category);
app.use("/api/v1/houses", house);
app.use("/api/v1/auth", auth);
app.use("/api/v1/user", user);
app.use("/api/v1/user_house", userhouse);
app.use("/api/v1/rating", rating);
// app.use(house);
//Port definition

app.use(errorHandler);
const PORT = process.env.PORT || 5000;

const server = app.listen(
    PORT,
    console.log(`server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
);