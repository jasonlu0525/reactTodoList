import { useAuth, useUserInfo } from "../util/context";
import { Navigate, Outlet } from 'react-router-dom';
import Swal from 'sweetalert2';

export const ProtectedRoute = () => {
    const { token } = useAuth();
    const { userInfo } = useUserInfo();
    if (!token && !userInfo) {
        Swal.fire({
            icon: "error",
            title: "請重新登入",

            confirmButtonText: '知道了',

        })
        return <Navigate to="/" replace />;
    }
    return <Outlet />
};