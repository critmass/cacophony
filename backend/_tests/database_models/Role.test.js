"use strict";

const Role = require("../../database_models/Role")
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


describe("Find", () => {
    it("finds all roles of a given server", async () => {
        const roles = await Role.find(1)
        expect(roles.length).toBe(2)
    })
    it("throws an error if server doesn't exist", async () => {
        try {
            await Role.find(5000)
        } catch (err) {
            expect(err instanceof NotFoundError).toBeTruthy()
        }
    })
})

describe("Get", () => {
    it("gets a role by id", async() => {
        const role = await Role.get(1)
        expect(role.id).toBe(1)
        expect(role.title).toBe("r1a")
        expect(role.serverId).toBe(1)
        expect(role.color.r).toBe(0)
        expect(role.color.b).toBe(255)
        expect(role.color.g).toBe(0)
        expect(role.isAdmin).toBeTruthy()
        expect(role.access.length).toBe(2)
    })
    it("throws an error if no role found", async () => {
        try {
            await Role.get(5000)
        } catch (err) {
            expect(err instanceof NotFoundError).toBeTruthy()
        }
    })
})

describe("Create", () => {
    it("creates a role", async () => {
        const role = Role.create("new_role", 1)
        expect(role.id).toBe(7)
        expect(role.title).toBe("new_role")
        expect(role.serverId).toBe(1)
        expect(role.color.r).toBe(255)
        expect(role.color.b).toBe(255)
        expect(role.color.g).toBe(255)
        expect(role.isAdmin).toBeFalsy()
    })
    it("throws an error if server doesn't exist", async () => {
        try {
            await Role.create("newest_role", 5000)
        } catch (err) {
            expect(err instanceof NotFoundError).toBeTruthy()
        }
    })
})

describe("Add Access", () => {
    it("adds access to a room to a given role", async () => {
        await Role.addAccess(2, 3, false)
        const role = await Role.get(2)
        expect(role.access.length).toBe(3)
    })
    it("adds access to a room to a given role as moderator", async () => {
        await Role.addAccess(1, 3, true)
        const role = await Role.get(1)
        expect(role.access.length).toBe(3)
        expect(role.access[2].isModerator).toBeTruthy()
    })
    it("throws an error if role doesn't exist", async () => {
        try {
            await Role.addAccess(5000, 2, false)
        } catch (err) {
            expect(err instanceof NotFoundError)
        }
    })
    it("throws an error if room doesn't exist", async () => {
        try {
            await Role.addAccess(1, 5000, false)
        } catch (err) {
            expect(err instanceof NotFoundError)
        }
    })
    it("throws an error if room and role not on same server", async () => {
        try {
            await Role.addAccess(1, 4, false)
        } catch (err) {
            expect(err instanceof BadRequestError)
        }
    })
})

describe("Remove Access", () => {
    it("should remove an access from a role", async () => {
        await Role.removeAccess(1, 1)
        const role = Role.get(1)
        expect(role.access[0].room).not.toBe(1)
    })
    it("should throw error if access doesn't exist", async () => {
        try{
            await Role.removeAccess(1, 3)
        }
        catch(err) {
            expect(err instanceof BadRequestError).toBeTruthy()
        }
    })
})

describe("Remove", () => {

    it("should remove a role", async () => {
        const {id} = await Role.create('role_to_remove', 1)
        const removedRole = await Role.remove(id)
        expect(removedRole.title).toBe('role_to_remove')
        expect(removedRole.color.r).toBe(255)
        expect(removedRole.color.b).toBe(255)
        expect(removedRole.color.g).toBe(255)
    })
    it("should throw an error if role doesn't exist", async () => {
        try {
            await Role.remove(5000)
        } catch (err) {
            expect(err instanceof NotFoundError).toBeTruthy()
        }
    })
})