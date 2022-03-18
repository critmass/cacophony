import useLogout from "../hooks/useLogout";

const Logout = () => {
    const logout = useLogout()
    return logout()
}
export default Logout