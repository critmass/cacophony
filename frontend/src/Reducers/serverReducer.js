import {
    ADD_SERVER,
    CLEAR_SERVER,
    GET_SERVER,
    UPDATE_ROOMS,
    UPDATE_MEMBERS,
    UPDATE_ROLES,
    UPDATE_SERVER
} from "../Actions/actionList"
import {v4 as uuid} from "uuid"

const INITIAL_STATE = {
    id:null,
    name:"",
    pictureUrl:"",
    startDate:null,
    members:[],
    roles:[]
}

const server = (state={...INITIAL_STATE}, action) => {
    switch (action.type) {
        case ADD_SERVER:
        case GET_SERVER:
            const s = action.server
            return {
                id:s.id,
                name:s.name,
                pictureUrl:s.picture_url,
                startDate:s.start_date,
                members:s.members.map(member => {
                    return {
                        ...member,
                        name:member.nickname,
                        key: uuid(),
                        link:`/server/${s.id}/member/${member.id}`
                    }
                }),
                roles: s.roles.map(role => {
                    return {
                        ...role,
                        name:role.title,
                        key: uuid(),
                        link: `/server/${s.id}/role/${role.id}`
                    }
                }),
                rooms: s.rooms.map(room => {
                    return {
                        ...room,
                        key: uuid(),
                        link: `/server/${s.id}/room/${room.id}`
                    }
                })
            }
        case UPDATE_SERVER:
            const update = {
                name: action.updates.name,
                pictureUrl: action.updates.picture_url
            }
            return {...state, ...update}
        case UPDATE_ROOMS:
            const rooms = action.rooms.map(room => {
                return {
                    ...room,
                    key: uuid(),
                    link: `/server/${state.id}/room/${room.id}`
                }
            })
            return {...state, rooms}
        case UPDATE_ROLES:
            const roles = action.roles.map(role => {
                return {
                    ...role,
                    key: uuid(),
                    name: role.title,
                    link: `/server/${state.id}/role/${role.id}`
                }
            })
            return {...state, roles}
        case UPDATE_MEMBERS:
            const members = action.members.map(member => {
                return {
                    ...member,
                    key: uuid(),
                    name: member.nickname,
                    link: `/server/${state.id}/member/${member.id}`
                }
            })
            return {...state, members}
        case CLEAR_SERVER:
            return {...INITIAL_STATE}
        default:
            return state
    }
}

export default server