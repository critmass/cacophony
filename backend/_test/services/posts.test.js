"use strict";

const request = require("supertest");

const app = require("../../app");
const {
    commonBeforeAll,
    commonBeforeEach,
    commonAfterEach,
    commonAfterAll,
    defaultColor1,
    defaultColor2,
    user1Token,
    user2Token,
    user4Token,
    user5Token
} = require("../routes/_testCommon");

beforeAll(commonBeforeAll)
beforeEach(commonBeforeEach)
afterEach(commonAfterEach)
afterAll(commonAfterAll)

describe("POST servers/:serverId/rooms/:roomId/posts", () => {
    const newPost = {}
    it("should create a post and return it", async () => {
        const resp = await request(app).post(`servers/1/rooms/1/posts`)
        expect(resp.status).toBe(201)

    })

})