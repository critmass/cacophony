"use strict";

/** Routes for memberships. */

const jsonschema = require("jsonschema");

const User = require("../database_models/user");
const express = require("express");
const router = new express.Router();
const { createToken } = require("../helpers/tokens");
const serverSchema = require("../json_schema/serverNew.json")
const { BadRequestError } = require("../expressError");

/** POST / {newServer} */

router.post("/",  async (req, res, next) => {
    try{

    }
    catch( err ){
        return next(err)
    }
})

module.exports = router