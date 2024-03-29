import { useContext } from "react";
import { AuthContext } from "../store/Context";
import { Navigate, Outlet } from "react-router-dom";



function PrivateRouter() {
const { user } = useContext(AuthContext);

  return user ? <Outlet /> : <Navigate to={'/'} />
}

export default PrivateRouter

