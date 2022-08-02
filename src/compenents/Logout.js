import React, {useEffect} from 'react';
import {useNavigate} from "react-router-dom";
import {useAuth} from "./Auth";
export default function Logout(){
    const auth = useAuth();
    const navigate  = useNavigate();

    useEffect(()=>{
        auth.logout();
        navigate('/login')
    })
    return(
        <div>

        </div>
    )
}