"use strict";

const request = require("supertest");

const db = require("../../db");
const app = require("../../app");
const User = require("../../routes/users");
const {
    commonBeforeAll,
    commonBeforeEach,
    commonAfterEach,
    commonAfterAll
} = require("./_testCommon");


beforeAll(commonBeforeAll)
beforeEach(commonBeforeEach)
afterEach(commonAfterEach)
afterAll(commonAfterAll)

describe("POST /users", () => {
    it("")
})