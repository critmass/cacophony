"use strict";

/** Routes for authentication. */

// this was heavily borrowed from the Jobly project

const jsonschema = require("jsonschema");

const User = require("../database_models/user");
const express = require("express");
const router = new express.Router();
const { createToken } = require("../helpers/tokens");
const userAuthSchema = require("../json_schema/userAuth.json");
const userRegisterSchema = require("../json_schema/userRegister.json")
const { BadRequestError } = require("../expressError");

/** POST /auth/token:  { username, password } => { token }
 *
 * Returns JWT token which can be used to authenticate further requests.
 *
 * Authorization required: none
 */

router.post("/token", async (req, res, next) => {
    try {
        const validator = jsonschema.validate(req.body, userAuthSchema);
        if (!validator.valid) {
            const errs = validator.errors.map(e => e.stack);
            throw new BadRequestError(errs);
        }

        const { userId, password } = req.body;
        const user = await User.authenticate(username, password);

        const token = createToken(user);
        await User.updateLastOn(user.id)

        return res.status(200).json({ token });

    } catch(err) {
        return next(err)
    }
})

/** POST /auth/register:   { user } => { token }
 *
 * user must include { username, password, firstName, lastName, email }
 *
 * Returns JWT token which can be used to authenticate further requests.
 *
 * Authorization required: none
 */

router.post("/register", async function (req, res, next) {
    try {
        const validator = jsonschema.validate(
                                        req.body,
                                        userRegisterSchema );
        if (!validator.valid) {
            const errs = validator.errors.map(e => e.stack);
            throw new BadRequestError(errs);
        }

        const newUser = await User.create(
            { ...req.body, isSiteAdmin: false }
        );
        const token = createToken(newUser);

        return res.status(201).json({ token });
    } catch (err) {
        return next(err);
    }
});

module.exports = router