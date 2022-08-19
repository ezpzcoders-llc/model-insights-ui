import React, { createContext, useState, useEffect } from 'react'
import jwtDecode from 'jwt-decode'

import { CONFIG } from '../utils/constants'
const { JWT, JWT_REMEMBERED } = CONFIG

export const decodeToken = () => {
    if (localStorage.getItem(JWT)) {
        const decodedToken = jwtDecode(localStorage.getItem(JWT))
        if (decodedToken.exp * 1000 < Date.now()) {
            localStorage.removeItem(JWT)
            return false
        } else {
            return decodedToken
        }
    }
}

export const AuthContext = createContext(null)

const AuthContextWrapper = ({ children }) => {
    const [user, setUser] = useState(null)
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const [rememberInfo, setRememberInfo] = useState(false)

    useEffect(() => {
        const decodedToken = decodeToken()
        setUser(decodedToken)
        setIsLoggedIn(decodedToken !== undefined)
    }, [])

    const login = data => {
        localStorage.setItem(JWT, data.token)
        setUser(data)
        setIsLoggedIn(true)

        if (rememberInfo) {
            // create variable with current token + remember me expiration, set it as JWT_remembered
            // pass the new expiration date to the node server, have it stored in the db as well
            // if rememberInfo is true, auto login if the expiration date has not passed
            // const saved
        } else {
            // check if JWT_remembered exists, and clear it
        }
    }
    const logout = () => {
        localStorage.removeItem(JWT)
        setUser(null)
        setIsLoggedIn(false)
    }

    return (
        <AuthContext.Provider
            value={{ user, isLoggedIn, setRememberInfo, login, logout }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContextWrapper
