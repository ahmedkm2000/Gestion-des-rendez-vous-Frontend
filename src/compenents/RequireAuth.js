import React, {useEffect} from 'react';
import {useNavigate} from "react-router-dom";
import {useAuth} from "./Auth";
export const RequireAuth = ({children}) => {
    const navigate = useNavigate();
    const auth = useAuth();
    useEffect(()=>{
        if(!auth.user ){
            navigate('/login')
        }
        if (auth.user && localStorage.getItem('isSuperAdmin')==="true") {
            navigate('/organizations')
        }
        if (auth.user && localStorage.getItem('isSuperAdmin')==="false") {
            navigate('/organizations/all')
        }
    },[])
    return children
}
