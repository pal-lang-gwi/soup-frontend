import { ReactNode, useEffect } from "react";
import { useNavigate } from "react-router";
import { onSilentRefresh } from "../api/auth/login";

interface AuthProviderProps{
    children: ReactNode;
}

const AuthProvider = ({children} : AuthProviderProps) => {
    //user 정보 가져오기
    const navigate = useNavigate();

    useEffect(() => {
        const checkLogin = async() =>{
            try{
                await onSilentRefresh();
                if (location.pathname === "/") {
                    navigate('/signup');
                }
            }catch(error){
                // 에러 처리
            }
        };
        checkLogin();
    }, [navigate]);
    return <>{children}</>;
};

export default AuthProvider
