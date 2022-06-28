import React, {useState, useEffect, createContext} from "react";
import { useNavigate } from "react-router-dom";
import { api, createSession } from "../services/api";

export const AuthContext = createContext();

export const AuthProvider = ({children}) => {
    // se usuario != null // se usuario == null
    // authenticated = true // authenticated = false
    
    const navigate = useNavigate()
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const recoveredUser = localStorage.getItem('user')

        if (recoveredUser) {
            setUser(JSON.parse(recoveredUser))
        }
        setLoading(false)
    }, [])

    const login = async (usuario, senha) =>{

        //api criar uma sessão
        const response = await createSession(usuario, senha)
        console.log("login", response.data)

        const loggedUser = response.data.user

        localStorage.setItem("user", JSON.stringify(loggedUser))

          setUser(loggedUser)  
          navigate("/")
        
    }

    const logout = () => {
        console.log("logout")

        localStorage.removeItem('user')

        api.defaults.headers.Authorization = null

        setUser(null)
        navigate("/login")
    }
    return(
        

        <AuthContext.Provider value={{authenticated: !!user, user, loading, login, logout}}>
        {children}
        </AuthContext.Provider>
    )}