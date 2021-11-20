"use strict";

/** Express app for Cacophony */

const express = require("express")
const cors = require("cors")
const morgan = require("morgan");

const { NotFoundError } = require("./expressError")

const { authenticateJWT } = require("./middleware/auth");
const authRoutes = require("./routes/auth")
const usersRoutes = require("./routes/users")
const serversRoutes = require("./routes/servers");



const app = express()

app.use(cors());
app.use(express.json());
app.use(morgan("tiny"));
app.use(authenticateJWT)

app.use("/servers", serversRoutes)
app.use("/users", usersRoutes)
app.use("/auth", authRoutes)


// the two error handlers below were lifted from the express-jobly project
/** Handle 404 errors -- this matches everything */
app.use(function (req, res, next) {
    return next(new NotFoundError());
});

/** Generic error handler; anything unhandled goes here. */
app.use(function (err, req, res, next) {

    if (process.env.NODE_ENV !== "test") console.error(err.stack);
    const status = err.status? err.status : 500;
    const message = err.message;

    return res.status(status).json({
        error: { message, status },
    });
});

module.exports = app