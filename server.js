const express = require("express");
const dotenv = require("dotenv");
const morgan = require('morgan');
// const fileUpload = require('express-fileupload');
const bodyParser = require('body-parser');
const connectDB = require('./config/db');
const errorHandler = require('./middleware/error');
// const fs = require('fs')


//Load env vars
dotenv.config({ path: "./config/config.env" });

const app = express();
// Connect to database
connectDB();
//Dev logging middleware
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}
//Routes definition
const category = require("./routes/category");
const house = require("./routes/house");
const auth = require("./routes/auth");
const userhouse = require("./routes/userhouse");



//Body parser
// app.use(express.json());
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }));

// app.use(fileUpload());

//Mount routes
app.use("/api/v1/categories", category);
app.use("/api/v1/houses", house);
app.use("/api/v1/auth", auth);
app.use("/api/v1/user_house", userhouse);
// app.use(house);
//Port definition

app.use(errorHandler);
const PORT = process.env.PORT || 5000;

const server = app.listen(
    PORT,
    console.log(`server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
);