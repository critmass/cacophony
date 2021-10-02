"use strict";

/** Routes for users. */

const jsonschema = require("jsonschema");

const express = require("express");
const {
    ensureLoggedIn,
    ensureIsAdmin,
    ensureLoggedInOrAdmin
} = require("../middleware/auth");
const {
    BadRequestError,
    UnauthorizedError
} = require("../expressError");
const User = require("../models/user");
// const { createToken } = require("../helpers/tokens");
const userNewSchema = require("../json_schemas/userNew.json");
const userUpdateSchema = require("../json_schemas/userUpdate.json");

const router = express.Router();

/** POST / {user} => { user, token }
 *
 * Add a new user
*/

router.post("/", async function (req, res, next) {

})

module.exports = router