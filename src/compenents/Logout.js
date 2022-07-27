import React, {useEffect} from 'react';
import {useAuth} from "./Auth";
import {useNavigate} from "react-router-dom";
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