"use strict";

/** Routes for users. */

const jsonschema = require("jsonschema");

const express = require("express");
const {
    ensureLoggedIn,
    ensureIsSiteAdmin,
    ensureLoggedInOrSiteAdmin
} = require("../middleware/auth");
const {
    BadRequestError,
    UnauthorizedError
} = require("../expressError");
const User = require("../models/user");
const { createToken } = require("../helpers/tokens");
const userNewSchema = require("../json_schemas/userNew.json");
const userUpdateSchema = require("../json_schemas/userUpdate.json");

const router = express.Router();

/** POST / {user} => { user, token }
 *
 * Add a new user
*/

router.post("/", async (req, res, next) => {})

/** GET / => {users:[{id, username, picture_url, last_on},...]} */

router.get("/", async (req, res, next) => {})

/** GET /[userId] => {user:{
 *                      id,
 *                      username,
 *                      picture_url,
 *                      joining_date,
 *                      last_on,
 *                      is_site_admin,
 *                      memberships:[{
 *                          membership_id,
 *                          server_id,
 *                          server_name,
 *                          server_picture_id
 *                      }, ...]
 *                  }} */

router.get("/:userId", async (req, res, next) => {})

/** PATCH /[userId] {user} => {user} */

router.patch("/:userId", async (req, res, next) => {})

/** DELETE /[userId] => {user:{id, username, picture_url, joining_date, last_on}} */

router.delete("/:userId", async (req, res, next) => {})

module.exports = router