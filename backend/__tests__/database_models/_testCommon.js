const bcrypt = require("bcrypt")

const db = require("../../db")
const { BCRYPT_WORK_FACTOR } = require("../../config")
const { colorToInt } = require("../../helpers/colorConverter")
const { timeJSToSQL } = require("../../helpers/timeConverter")

const defaultImgURL   = "https://moonvillageassociation.org/wp-content/uploads/2018/06/default-profile-picture1.jpg"
const defaultTimeJS   = new Date(2024,10,1,12,43,55,0)
const defaultTimeSQL = timeJSToSQL(defaultTimeJS)
const colorRed   = colorToInt({r:255, b:0, g:0})
const colorBlue  = colorToInt({r:0, b:255, g:0})
const colorGreen = colorToInt({r:0, b:0, g:255})

const commonBeforeAll = async () => {

    await db.query("DELETE FROM reactions")
    await db.query("DELETE FROM posts")
    await db.query("DELETE FROM memberships")
    await db.query("DELETE FROM access")
    await db.query("DELETE FROM rooms")
    await db.query("DELETE FROM roles")
    await db.query("DELETE FROM users")
    await db.query("DELETE FROM servers")
    await db.query("DELETE FROM invites")

    await db.query("ALTER SEQUENCE users_id_seq RESTART WITH 1")
    await db.query("ALTER SEQUENCE servers_id_seq RESTART WITH 1")
    await db.query("ALTER SEQUENCE rooms_id_seq RESTART WITH 1")
    await db.query("ALTER SEQUENCE roles_id_seq RESTART WITH 1")
    await db.query("ALTER SEQUENCE posts_id_seq RESTART WITH 1")
    await db.query("ALTER SEQUENCE memberships_id_seq RESTART WITH 1")

    await db.query(`
        INSERT INTO users (
            username,
            password,
            joindate_date,
            last_on,
            picture_url
        )
        VALUES
            ('u1', $3, $2, $2, $1),
            ('u2', $4, $2, $2, $1),
            ('u3', $5, $2, $2, $1)
        RETURNING id, username
    `,[
        defaultImgURL, defaultTimeSQL,
        await bcrypt.hash("password1", BCRYPT_WORK_FACTOR),
        await bcrypt.hash("password2", BCRYPT_WORK_FACTOR),
        await bcrypt.hash("password3", BCRYPT_WORK_FACTOR)
    ])
    await db.query(`
        INSERT INTO servers (name, picture_url, start_date)
        VALUES
            ('s1', $1, $2),
            ('s2', $1, $2),
            ('s3', $1, $2)
        RETURNING id, name
    `, [defaultImgURL, defaultTimeSQL])
    await db.query(`
        INSERT INTO roles (title, server_id, color, is_admin)
        VALUES
            ('r1a', 1, $1, true),
            ('r1n', 1, $2, false),
            ('r2a', 2, $1, true),
            ('r2n', 2, $2, false),
            ('r3a', 3, $1, true),
            ('r3n', 3, $2, false)
        RETURNING id, title
    `, [colorBlue, colorRed])
    await db.query(`
        INSERT INTO membership
            (user_id, role_id, server_id, nickname, joining_date)
        VALUES
            (1, 1, 1, 'a1', $1),
            (2, 2, 1, 'm2', $1),
            (3, 2, 1, 'm3', $1),
            (1, 4, 2, 'm4', $1),
            (2, 3, 2, 'a5', $1),
            (3, 4, 2, 'm6', $1),
            (1, 6, 3, 'm7', $1),
            (2, 6, 3, 'm8', $1),
            (3, 5, 3, 'a9', $1)
        RETURN id, nickname
    `, [defaultTimeSQL])
    await db.query(`
        INSERT INTO rooms ( name, server_id )
        VALUES
            ('room11', 1, 'text'),
            ('room12', 1, 'text'),
            ('room13', 1, 'text'),
            ('room21', 2, 'text'),
            ('room22', 2, 'text'),
            ('room31', 3, 'text'),
            ('room32', 3, 'text')
        RETURN id, name
    `)
    await db.query(`
        INSERT INTO access (role_id, room_id, is_moderators)
        VALUES
            (1, 1, true), (2, 1, false), (1, 2, true), (2, 2, false)
    `)
    await db.query(`
        INSERT INTO posts (room_id, member_id, content, post_date)
        VALUES
            (1, 1, 'post 1', $1),
            (1, 2, 'post 2', $1),
            (1, 3, 'post 3', $1)
        return id
    `, [defaultTimeSQL])

}

const commonBeforeEach = async () => {
    await db.query("BEGIN")
}

const commonAfterEach = async () => {
    await db.query("ROLLBACK")
}

const commonAfterAll = async () => {
    await db.end()
}

module.exports = {
    commonAfterAll,
    commonAfterEach,
    commonBeforeAll,
    commonBeforeEach,
    defaultImgURL,
    defaultTimeSQL
}