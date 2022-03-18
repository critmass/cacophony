import { useDispatch } from "react-redux";
import { Redirect } from "react-router";
import { clearMemberships } from "../Actions/membershipActionMaker";
import { clearServer } from "../Actions/serverActionMaker";
import { clearToken } from "../Actions/tokenActionMaker";
import { clearUser } from "../Actions/userActionMaker";

const useLogout = () => {
    const dispatch = useDispatch()
    const logout = () => {
        dispatch(clearServer())
        dispatch(clearMemberships())
        dispatch(clearUser())
        dispatch(clearToken())
        return (<Redirect to="/"/>)
    }
    return logout
}

export default useLogout