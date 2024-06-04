import { useState, useEffect } from "react";
import Router from "next/router";
import {jwtDecode} from "jwt-decode";

export function useAuth() {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem("token");

        if (token) {
            const decoded = jwtDecode(token);
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
            const decoded = jwtDecode(token);
            setUser(decoded);
            Router.push("/resources");
        } else {
            throw new Error("Invalid credentials");
        }
    };

    const signup = async (email, password) => {
    const res = await fetch("/api/signup", {
        method: "POST",
        headers: {
        "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
    });

    if (res.ok) {
        const { token } = await res.json();
        localStorage.setItem("token", token);
        const decoded = jwtDecode(token);
        setUser(decoded);
        Router.push("/resources");
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
