const http = require('http');
const path = require('path');
const express = require('express');
const dotenv = require('dotenv');
const session = require('express-session')

// 1. Environment Variables
dotenv.config({path: path.join(__dirname, 'config/app.env') });
dotenv.config({path: path.join(__dirname, 'config/db.env') });


// 2. Application Routers
// { }로 받아올 때는 사용하고자하는 모듈 함수의 이름을 정확히 지정해주어야 한다
const { applicationRouter } = require("./routes");
const { SIGTERM } = require('constants');

// 3. Logging
const logger = require("./logging");

// 4. Appication Setup
const application = express()
    // 4-1. Session Environment
    .use(session({
        secret: "mysite-session",
        resave: false,
    }))
    // 4-2. request body parser
    .use(express.urlencoded({ extended: true })) // application/x-www-form-urlencoded
    .use(express.json()) // application/json

    // 4-3. Multipart

    // 4-4. static resources
    .use(
        express.static(
            path.join(__dirname, process.env.STATIC_RESOURCES_DIRECTORY)
        )
    )
    // 4-3. view engine setup
    .set("views", path.join(__dirname, "views"))
    .set("view engine", "ejs");

// 5. Application Router Setup
applicationRouter.setup(application);

// Server Setup
http.createServer(application)
    .on("listening", function () {
        logger.info(`http server runs on ${process.env.PORT}`);
    })
    .on("error", function (error) {
        switch (error.code) {
            case "EACCESS":
                logger.error(`${process.env.PORT} requires privileges`);
                process.exit(1);
                break;
            case "EADDRINUSE":
                logger.error(`${process.env.PORT} is already in use`);
                process.exit(1);
                break;

            default:
                throw error;
        }
    })
    .listen(process.env.PORT);
