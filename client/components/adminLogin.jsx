import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import './adminLogin.css';

const AdminLogin = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        const verifyToken = async () => {
            try {
                const response = await fetch('/verify-token', {
                    method: 'GET',
                    credentials: 'include', // Ensures cookies are sent with the request
                });

                if (response.ok) {
                    const data = await response.json();
                    console.log("Token verified successfully:", data);
                    setMessage(`Welcome back, ${data.username}`);
                    navigate("/admin");
                } else {
                    console.log("Token verification failed.");
                }
            } catch (error) {
                console.error("Token verification error:", error);
            }
        };
        verifyToken();
    }, [navigate]);

    const handleLogin = async (event) => {
        event.preventDefault();
        try {
            const response = await fetch('/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include', // Ensures cookies are sent with the request
                body: JSON.stringify({ username, password }),
            });

            if (response.ok) {
                console.log("Login successful. Redirecting to /admin.");
                setMessage("Login successful!");
                setUsername("");
                setPassword("");
                navigate("/admin");
            } else {
                const data = await response.json();
                console.log("Login failed with message:", data.error);
                setMessage(data.error || "Login failed");
            }
        } catch (error) {
            console.error("Login error:", error);
            setMessage("An error occurred. Please try again.");
        }
    };


    
    

    return (
        <div id="admLogMainContainer">
            <h1 id="logo">Loading..</h1>
            <h3 id="adminLogin">Admin login</h3>
            <form className="admFloater" onSubmit={handleLogin}>
                <div className="inputBox">
                    <input
                        id="adminUsername"
                        type="text"
                        placeholder="Username..."
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                    <input
                        id="adminPassword"
                        type="password"
                        placeholder="Password..."
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <button id="loginBtn" type="submit">LOGIN</button>
                <div id="adminMessage">
                    {message && <p id="adminPTagMessage">{message}</p>}
                </div>
            </form>

        </div>
    );
};

export default AdminLogin;
