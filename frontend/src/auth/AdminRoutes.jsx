import { Navigate } from "react-router-dom";

export default function AdminRoute({ children }) {
    const userRole = localStorage.getItem('role');

    // check if the user is a lecturer
    if (userRole === 'admin') {
        return children;
    } else {
        return <Navigate to={'/register'} />;
    }
}