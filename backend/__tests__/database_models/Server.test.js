"use strict";

const Server = require("../../database_models/Server")
const {
    NotFoundError,
    BadRequestError
} = require("../../expressError")

const {
    commonAfterAll,
    commonAfterEach,
    commonBeforeAll,
    commonBeforeEach,
    defaultImgURL,
    defaultTimeSQL
} = require("./_testCommon")

beforeAll(commonBeforeAll);
beforeEach(commonBeforeEach);
afterEach(commonAfterEach);
afterAll(commonAfterAll);

describe("Find All", () => {
    it("finds all servers", async () => {
        const servers = await Server.findAll()
        expect(servers.length).toBe(3)
    })
})

describe("Find", () => {
    it("finds all public servers when nothing is passed in", async () => {
        const servers = await Server.find()
        expect(servers.length).toBe(3)
    })
    it("finds a server by name", async () => {
        const server = await Server.find('s1')
        expect(server.id).toBe(1)
        expect(server.name).toBe('s1')
        expect(server.pictureURL).toBe(defaultImgURL)
        expect(server.startDate).toBe(defaultTimeSQL)
    })
    it("throws an error when they can't find server by name", async () => {
        try {
            await Server.find("not_a_server")
        } catch (err) {
            expect(err instanceof NotFoundError).toBeTruthy()
        }
    })
})

describe("Get", () => {
    it("gets a server by id", async () => {
        const server = await Server.get(1)
        expect(server.id).toBe(1)
        expect(server.name).toBe('s1')
        expect(server.pictureURL).toBe(defaultImgURL)
        expect(server.startDate).toBe(defaultTimeSQL)
    })
    it("throws an error if no server with id", async () => {
        try {
            await Server.get(5000)
        }
        catch(err) {
            expect(err instanceof NotFoundError).toBeTruthy()
        }
    })
})

describe("Create", () => {
    it("can create a new server", async () => {
        const newServer = await Server.create("new_server", defaultImgURL)
        expect(newServer.id).toBe(4)
        expect(newServer.name).toBe("new_server")
        expect(newServer.pictureURL).toBe(defaultImgURL)
        expect(newServer.startDate instanceof Date).toBeTruthy()
    })
    it("doesn't create a server with a name of an existing server", async () => {
        try {
            await Server.create("s1", defaultImgURL)
            fail()
        }
        catch(err) {
            expect(err instanceof BadRequestError).toBeTruthy()
        }
    })
})

describe("Delete", () => {
    it("deletes a server", async () => {
        const server = Server.delete(1)
        expect(server.name).toBe('s1')
    })
    it("throws an error if you try to delete a server that doesn't exist", async () => {
        try {
            await Server.delete(5000)
        }
        catch (err) {
            expect(err instanceof NotFoundError).toBeTruthy()
        }
    })
})