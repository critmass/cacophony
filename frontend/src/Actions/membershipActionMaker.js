import CacophonyApi from "../helpers/CacophonyAPI"
import {
    ADD_MEMBERSHIP,
    GET_MEMBERSHIPS,
    CLEAR_MEMBERSHIPS,
    REMOVE_MEMBERSHIP,
    UPDATE_MEMBERSHIPS
} from "./actionList"

const gotMemberships = memberships => {
    return {type:GET_MEMBERSHIPS, memberships}
}

const clearMemberships = () => {
    return {type:CLEAR_MEMBERSHIPS}
}

const updatedMembership = updates => {
    const memberId = updates.id
    return {type:UPDATE_MEMBERSHIPS, memberId, updates}
}

const updateMembership = (memberId, updates) => {
    const updateMembershipByApi = async dispatch => {
        const membership = await CacophonyApi.updateMembership(
            memberId, updates
        )
        dispatch(updatedMembership(membership))
    }
    return updateMembershipByApi
}

const addedMembership = membership => {
    return {type:ADD_MEMBERSHIP, membership}
}

const addMembership = (
    serverId,
    roleId,
    userId,
    nickname=null,
    pictureUrl=null
) => {

    const addMembershipToApi = async dispatch => {
        const membership = await CacophonyApi.addMembership(
            serverId,
            roleId,
            userId,
            nickname,
            pictureUrl
        )
        dispatch(addedMembership(membership))
    }
    return addMembershipToApi
}

const removedMembership = memberId => {
    return {type:REMOVE_MEMBERSHIP, memberId}
}

const removeMembership = memberId => {
    const removeMembershipFromApi = async dispatch => {
        await CacophonyApi.removerMembership(memberId)
        dispatch(removedMembership(memberId))
    }
    return removeMembershipFromApi

}

export {
    addedMembership,
    removedMembership,
    addMembership,
    gotMemberships,
    clearMemberships,
    updateMembership,
    removeMembership
}