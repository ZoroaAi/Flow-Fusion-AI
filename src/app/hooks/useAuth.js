import { useState, useEffect } from "react";
import Router from "next/router";
import {jwtDecode} from "jwt-decode";

export function useAuth() {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem("token");

        if (token) {
            const decoded = jwtDecode(token);
            console.log('Decoded token: ', decoded);
            setUser(decoded);
        }
    }, []);

    const login = async (email, password) => {
        const res = await fetch("/api/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email, password }),
        });

        if (res.ok) {
            const { token } = await res.json();
            localStorage.setItem("token", token);
            try{
                const decoded = jwtDecode(token);
                console.log('Decoded token on login:', decoded);
                setUser(decoded);
                Router.push("/resources");
            }catch(error){
                console.log('Failed to decoded token on login:', error);
            }
        } else {
            throw new Error("Invalid credentials");
        }
    };

    const signup = async (name, email, password) => {
        const res = await fetch("/api/signup", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ name, email, password }),
        });

        if (res.ok) {
            const { token } = await res.json();
            localStorage.setItem("token", token);
            try{
                const decoded = jwtDecode(token);
                console.log('Decoded token on signup:', decoded);
                setUser(decoded);
                Router.push("/resources");
            }catch(error){
                console.error('Failed to decode token on signup:', error);
            }
        } else {
            throw new Error("User already exists");
        }
    };

    const logout = () => {
        localStorage.removeItem("token");
        setUser(null);
        Router.push("/");
    };

    return {
        user,
        login,
        signup,
        logout,
    };
}
