"use strict";

const Room = require("../../database_models/Room")
const {
    NotFoundError,
    BadRequestError

} = require("../../expressError")

const {
    commonAfterAll,
    commonAfterEach,
    commonBeforeAll,
    commonBeforeEach,
} = require("./_testCommon")

beforeAll(commonBeforeAll);
beforeEach(commonBeforeEach);
afterEach(commonAfterEach);
afterAll(commonAfterAll);

describe("Find", () => {
    it("finds all rooms of a given server", async () => {
        const rooms = await Room.find(1)
        expect(rooms.length).toBe(3)
    })
    it("throws an error if not a valid server", async () => {
        try {
            await Room.find(5000)
        } catch (err) {
            expect(err instanceof NotFoundError).toBeTruthy()
        }
    })
})

describe("Get", () => {
    it("gets a room by id", async () => {
        const room = await Room.get(1)
        expect(room.id).toBe(1)
        expect(room.name).toBe("room11")
        expect(room.ServerId).toBe(1)
        expect(room.type).toBe("text")
    })
    it("throws an error if room doesn't exist", async () => {
        try {
            await Room.get(5000)
        } catch (err) {
            expect(err instanceof NotFoundError).toBeTruthy()
        }
    })
})

describe("Create", () => {
    it("creates a new room", async () => {
        const room = Room.create("new_room", 1, "text")
        expect(room.id instanceof Number).toBeTruthy()
        expect(room.ServerId).toBe(1)
        expect(room.name).toBe('new_room')
        expect(room.type).toBe("text")
    })
    it("throws an error if server doesn't exist", async () => {
        try {
            await Room.create("not_a_room", 5000)
        } catch (err) {
            expect(err instanceof NotFoundError).toBeTruthy()
        }
    })
    it("throws an error if server already has a room with the same name", async () => {
        try {
            await Room.create('room11', 1)
        } catch (err) {
            expect(err instanceof BadRequestError).toBeTruthy()
        }
    })
})

describe("Remove", () => {
    it("removes a room", async () => {
        const room = Room.remove(1)
        expect(room.name).toBe('room11')
    })
    it("throws an error if room doesn't exist", async () => {
        try {
            await Room.remove(5000)
        } catch (err) {
            expect(err instanceof NotFoundError).toBeTruthy()
        }
    })
})