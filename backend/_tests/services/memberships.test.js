"use strict";

const request = require("supertest");

const app = require("../../app");
const {
    commonBeforeAll,
    commonBeforeEach,
    commonAfterEach,
    commonAfterAll
} = require("../routes/_testCommon");

beforeAll(commonBeforeAll)
beforeEach(commonBeforeEach)
afterEach(commonAfterEach)
afterAll(commonAfterAll)

describe("POST /servers/:serverId/members", () => {
    const newMember = { userId:4, roleId:2, nickname:"new guy"}
    it("should take a user and a role to create a " +
        "membership if current user is an admin", async () => {
            const resp = await request(app)
                                    .post("/servers/1/members")
                                    .send(newMember)
                                    .set(
                                        "authorization",
                                        `Bearer ${user1Token}`
                                    )
            expect(resp.status).toBe(201)
    })
    it("should return a 401 status code if user isn't an admin", async () => {
        const resp = await request(app)
                                .post("/servers/2/members")
                                .send(newMember)
                                .set(
                                        "authorization",
                                        `Bearer ${user4Token}`
                                    )
        expect(resp.status).toBe(401)
    })
    it("should return a 404 if user isn't valid", async () => {
        const resp = await request(app)
                                .post("/servers/2/members")
                                .send({
                                    userId:5000,
                                    roleId:2,
                                    nickname:"another new guy"
                                })
        expect(resp.status).toBe(404)
    })
    it("should return a 403 if role isn't valid", async () => {
        const resp = await request(app)
                                .post("/servers/2/members")
                                .send({
                                    userId:4,
                                    roleId:5,
                                    nickname:"another new guy"
                                })
        expect(resp.status).toBe(403)
    })
})