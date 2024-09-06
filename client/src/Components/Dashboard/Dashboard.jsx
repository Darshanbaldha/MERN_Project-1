import axios from "axios";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Dashboard(){
    const navigate = useNavigate();
    const getUser = async () => {
        try {
            const response = await axios.get("http://localhost:5000/signup/success", { withCredentials: true })
        } catch (error) {
            navigate("*")
        }
    }

    useEffect(() => {
        getUser()
    }, [])
    return(
        <>
            <p>This is Dashboard.</p>
        </>
    )
}