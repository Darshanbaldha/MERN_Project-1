import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import axios from "axios"

export default function Header() {

    const [userdata, setUserdata] = useState({});
    console.log("Response", userdata);

    const getUser = async () => {
        try {
            const response = await axios.get("http://localhost:5000/signup/success", { withCredentials: true })
            setUserdata(response.data.user)
        } catch (error) {
            console.log("Erroro", error);

        }
    }

    const logout = () => {
        window.open("http://localhost:5000/logout","_self")
    }

    useEffect(() => {
        getUser()
    }, [])

    return (
        <>
            <header>
                <nav className="navbar navbar-expand-lg bg-body-tertiary">
                    <div className="container-fluid">
                        <h1 className="navbar-brand">Food Fresher</h1>
                        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="collapse navbar-collapse" id="navbarSupportedContent">
                            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                                <li className="nav-item">
                                    <NavLink to="/" className="nav-link">Home</NavLink>
                                </li>
                                {
                                    Object?.keys(userdata)?.length > 0 ? (
                                        <>
                                            <li className="nav-item">
                                                <NavLink to='/dashboard' className="nav-link">Dashboard</NavLink >
                                            </li>
                                            <li className="nav-item">
                                                <NavLink to='#' className="nav-link">{userdata?.displayName}</NavLink >
                                            </li>
                                            <li className="nav-item">
                                                <img src={userdata?.image} alt="logo" style={{ width: "50px", borderRadius: "50%" }} />
                                            </li>
                                            <li className="nav-item">
                                                <NavLink to='/' className="nav-link" onClick={logout}>Logout</NavLink >
                                            </li>
                                        </>
                                    ) : (
                                        <li className="nav-item">
                                            <NavLink to='/signup' className="nav-link">SignUp</NavLink >
                                        </li>
                                    )
                                }
                            </ul>
                        </div>
                    </div>
                </nav>
            </header>

        </>
    )
}