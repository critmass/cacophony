"use strict";

const Post = require("../../database_models/Post")
const {
    NotFoundError,
    BadRequestError

} = require("../../expressError")

const {
    commonAfterAll,
    commonAfterEach,
    commonBeforeAll,
    commonBeforeEach,
    defaultTimeSQL
} = require("./_testCommon")

beforeAll(commonBeforeAll);
beforeEach(commonBeforeEach);
afterEach(commonAfterEach);
afterAll(commonAfterAll);

describe("Find", () => {
    it("finds posts by room id", async () => {
        const posts = await Post.find(1)
        expect(posts.length).toBe(3)
    })
    it("throws an error if room id not found", async () => {
        try {
            await Post.find(5000)
        } catch (err) {
            expect(err instanceof NotFoundError).toBeTruthy()
        }
    })
})

describe("Get", () => {
    it("gets a post by id", async () => {
        const post = await Post.get(1)
        expect(post.id).toBe(1)
        expect(post.roomId).toBe(1)
        expect(post.memberId).toBe(1)
        expect(post.content).toBe("post 1")
        expect(post.date).toBe(defaultTimeSQL)
    })
    it("throws an error if post id not found", async () => {
        try {
            await Post.get(5000)
        } catch (err) {
            expect(err instanceof NotFoundError).toBeTruthy()
        }
    })
})

describe("Create", () => {
    it("creates a new post", async () => {
        const newPost = Post.create(1, 1, "new post")
        expect(newPost.id instanceof Number).toBeTruthy()
        expect(newPost.roomId).toBe(1)
        expect(newPost.content).toBe("new post")
        expect(newPost.memberId).toBe(1)
    })
    it("throws an error if member id not found", async () => {
        try {
            await Post.create(5000, 1, "bad post")
        } catch (err) {
            expect(err instanceof NotFoundError).toBeTruthy()
        }
    })
    it("throws an error if room id not found", async () => {
        try {
            await Post.create(1, 5000, "bad post")
        } catch (err) {
            expect(err instanceof NotFoundError).toBeTruthy()
        }
    })
    it("throws an error if post content empty", async () => {
        try {
            await Post.create(1, 1, "")
        } catch (err) {
            expect(err instanceof BadRequestError).toBeTruthy()
        }
    })
})

describe("Delete", () => {
    it("deletes a post", async () => {
        const deletedPost = Post.delete(1)
        expect(deletedPost.memberId).toBe(1)
        expect(deletedPost.roomId).toBe(1)
        expect(deletedPost.content).toBe("post 1")
    })
    it("throws an error if post id not found", async () => {
        try {
            await Post.delete(5000)
        } catch (err) {
            expect(err instanceof NotFoundError).toBeTruthy()
        }
    })
})