const Role = require("../database_models/Role")
const { NotFoundError } = require("../expressError")


const checkIfRoleIsOnSever = async (serverId, roleId) => {
    const { server_id } = await Role.get(roleId)
    if (server_id !== serverId) {
        throw new NotFoundError("role not on server")
    }
}

module.exports = {checkIfRoleIsOnSever}