import { useDispatch } from "react-redux";
import { useHistory } from "react-router";
import { clearMemberships } from "../Actions/membershipActionMaker";
import { clearServers } from "../Actions/serverActionMaker";
import { clearToken } from "../Actions/tokenActionMaker";
import { clearUser } from "../Actions/userActionMaker";

const useLogout = () => {
    const dispatch = useDispatch()
    const history = useHistory()
    return logout = () => {
        dispatch(clearServers())
        dispatch(clearMemberships())
        dispatch(clearUser())
        dispatch(clearToken())
        history.push("/")
    }
}

export default useLogout