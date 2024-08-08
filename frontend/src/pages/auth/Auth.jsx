import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const Auth = () => {
  let isLogin = useSelector((state) => state.auth.token);
  console.log(isLogin);
  
  return isLogin ? <Outlet /> : <Navigate replace to="/login" />;
};

export default Auth;