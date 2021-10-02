"use strict";

/** Routes for authentication. */

const jsonschema = require("jsonschema");

const User = require("../database_models/user");
const express = require("express");
const router = new express.Router();
const { createToken } = require("../helpers/tokens");
const userAuthSchema = require("../json_schemas/userAuth.json");
const userRegisterSchema = require("../json_schemas/userRegister.json");
const { BadRequestError } = require("../expressError");

/** POST /auth/token:  { username, password } => { token }
 *
 * Returns JWT token which can be used to authenticate further requests.
 *
 * Authorization required: none
 */

module.exports = router