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
                console.log('토큰있어서 그냥 로그인할게요');
                if (location.pathname === "/") {
                    navigate('/signup');
                }
            }catch(error){
                console.log('에러남', error);
            }
        };
        checkLogin();
    }, [navigate]);
    return <>{children}</>;
    
};

export default AuthProvider
