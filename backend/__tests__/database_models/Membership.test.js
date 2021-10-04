"use strict";

const Membership = require("../../database_models/Membership")
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


describe("Find by Server", () => {
    it("finds memberships by server id", async () => {
        const members = await Membership.findByServer(1)
        expect(members.length).toBe(3)
    })
    it("Throws an error if server doesn't exist", async () => {
        try {
            await Membership.findByServer(5000)

        } catch (err) {
            expect(err instanceof NotFoundError).toBeTruthy()
        }
    })
})

describe("Find by User", () => {
    it("finds memberships by user id", async () => {
        const members = await Membership.findByUser(1)
        expect(members.length).toBe(3)
    })
    it("Throws an error if user doesn't exist", async () => {
        try {
            await Membership.findByUser(5000)

        } catch (err) {
            expect(err instanceof NotFoundError).toBeTruthy()
        }
    })
})

describe("Find by Role", () => {
    it("finds memberships by role id", async () => {
        const members = await Membership.findByRole(1)
        expect(members.length).toBe(3)
    })
    it("Throws an error if role doesn't exist", async () => {
        try {
            await Membership.findByRole(5000)

        } catch (err) {
            expect(err instanceof NotFoundError).toBeTruthy()
        }
    })
})

describe("Get", () => {
    it("gets membership by id", async () => {
        const member = Membership.get(1)
        expect(member.id).toBe(1)
        expect(member.userId).toBe(1)
        expect(member.serverId).toBe(1)
        expect(member.roleId).toBe(1)
        expect(member.nickname).toBe("a1")
        expect(member.pictureURL).toBe(defaultImgURL)
        expect(member.joiningDate).toBe(defaultTimeSQL)
    })
    it("throws an error when there is no membership with that id", async () => {
        try {
            await Membership.get(5000)
        } catch (err) {
            expect(err instanceof NotFoundError).toBeTruthy()
        }
    })
})

describe("Create", () => {
    it("creates a new member", async () => {
        const member = await Membership.create(1, 7, defaultImgURL)
        expect(member.id).toBe(9)
        expect(member.userId).toBe(1)
        expect(member.serverId).toBe(1)
        expect(member.roleId).toBe(7)
        expect(member.pictureURL).toBe(defaultImgURL)
    })
    it("throws an error if user doesn't exist", async () => {
        try {
            await Membership.create(5000, 7, defaultImgURL)
        } catch (err) {
            expect(err instanceof NotFoundError).toBeTruthy()
        }
    })
    it("throws an error if server doesn't exist", async () => {
        try {
            await Membership.create(1, 5000, defaultImgURL)
        } catch (err) {
            expect(err instanceof NotFoundError).toBeTruthy()
        }
    })
    it("throws an error if user already has a membership on the server", async () => {
        try {
            await Membership.create(1, 1, defaultImgURL)
        } catch (err) {
            expect(err instanceof BadRequestError).toBeTruthy()
        }
    })
})

describe("Update Nickname", () => {
    it("updates the nickname", async () => {
        const updateNickname = await Membership.updateNickname(1, "updated_nickname")
        expect(updateNickname.nickname).toBe("updated_nickname")
        expect(updateNickname.id).toBe(1)
    })
    it("throws an error if membership doesn't exist", async () => {
        try {
            await Membership.updateNickname(5000, "not_a_member")
        } catch (err) {
            expect(err instanceof NotFoundError).toBeTruthy()
        }
    })
    it("throws an error if nickname already exists on server", async () => {
        try {
            await Membership.updateNickname(1, "m2")
        } catch (err) {
            expect(err instanceof NotFoundError).toBeTruthy()
        }
    })
})

describe("Update Role", () => {
    it("updates the role of a membership", async () => {
        const member = await Membership.updateRole(2, 1)
        expect(member.id).toBe(2)
        expect(member.userId).toBe(2)
        expect(member.serverId).toBe(1)
        expect(member.roleId).toBe(1)
        expect(member.nickname).toBe("m2")
        expect(member.pictureURL).toBe(defaultImgURL)
        expect(member.joiningDate).toBe(defaultTimeSQL)
    })
    it("throws an error when membership doesn't exist", async () => {
        try {
            await Membership.updateRole(5000, 1)
        } catch (err) {
            expect(err instanceof NotFoundError).toBeTruthy()
        }
    })
    it("throws an error when role doesn't exist", async () => {
        try {
            await Membership.updateRole(1, 5000)
        } catch (err) {
            expect(err instanceof NotFoundError).toBeTruthy()
        }
    })
    it("throws an error when role and member not on same server", async () => {
        try {
            await Membership.updateRole(1, 5)
        } catch (err) {
            expect(err instanceof BadRequestError).toBeTruthy()
        }
    })
})

describe("Remove", () => {
    it("it removes a membership", async () => {
        const removedMember = Membership.remove(1)
        expect(removedMember.userId).toBe(1)
        expect(removedMember.serverId).toBe(1)
        expect(removedMember.roleId).toBe(1)
    })
    it("throws an error if membership id doesn't exist", async () => {
        try {
            await Membership.remove(5000)
        } catch (err) {
            expect(err instanceof NotFoundError).toBeTruthy()
        }
    })
})