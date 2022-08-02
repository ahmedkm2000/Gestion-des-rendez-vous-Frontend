import {useState,useContext,createContext} from "react";
const AuthContext = createContext(null)
export const AuthProvider = ({children})=>{
    const [user,setUser] = useState(localStorage.getItem('user'));
    const [isSuperAdmin,setIsSuperAdmin] = useState(localStorage.getItem('isSuperAdmin'))

    const login = (userInfo) => {
        setUser(userInfo);
        localStorage.setItem('user',user);
    };
    const logout = () => {
        localStorage.removeItem('user');
        setUser(null);
    };
    const setSuperAdmin = (status) => {
        setIsSuperAdmin(status);
        localStorage.setItem('isSuperAdmin',status);
    };
    return(
        <AuthContext.Provider value={{user,isSuperAdmin,login,logout,setSuperAdmin}}>
            {children}
        </AuthContext.Provider>
    )
}
export const useAuth = () => {
    return useContext(AuthContext)
}