import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "../Css/Login.module.css";

const API_URL = "http://localhost:3000";

function LoginPage() {
    const [isLogIn, setIsLogIn] = useState(true);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [username, setUsername] = useState("");

    const navigate = useNavigate();

    function handleLoginChange() {
        setIsLogIn(!isLogIn);
        setEmail("");
        setPassword("");
        setUsername("");
    }

    async function handleLogin(e) {
        e.preventDefault();
        if (!email || !password) {
            alert("Molimo popunite sva polja");
            return;
        }

        try {
            const res = await fetch(`${API_URL}/login`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password })
            });

            const data = await res.json();

            if (!res.ok) {
                alert(data.error);
                return;
            }

            localStorage.setItem("userId", data.userId);
            localStorage.setItem("username", data.username);

            alert("Uspešno logovanje!");
            navigate("/main");
        } catch (err) {
            console.error(err);
            alert("Greška sa serverom");
        }
    }

    async function handleSignup(e) {
        e.preventDefault();
        if (!username || !email || !password) {
            alert("Molimo popunite sva polja");
            return;
        }

        try {
            const res = await fetch(`${API_URL}/signup`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ username, email, password })
            });

            const data = await res.json();

            if (!res.ok) {
                alert(data.error);
                return;
            }

            alert("Registracija uspešna! Možeš se ulogovati.");
            setIsLogIn(true);
        } catch (err) {
            console.error(err);
            alert("Greška sa serverom");
        }
    }

    return (
        <div className={styles.Container}>
            {isLogIn ? (
                <div className={styles.FormContainer}>
                    <h2 className={styles.LoginHeader}>Log In</h2>
                    <form onSubmit={handleLogin}>
                        <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder="Enter Your Email" className={styles.InputField}/>
                        <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" placeholder="Enter Your Password" className={styles.InputField}/>
                        <button type="submit" className={styles.Button}>Login</button>
                    </form>
                    <div className={styles.ButtomButtonDiv}>
                        <button onClick={handleLoginChange} className={styles.ToggleLogin}>Sign Up Instead</button>
                        <Link to="/">Back To Home</Link>
                    </div>
                </div>
            ) : (
                <div className={styles.FormContainer}>
                    <h2 className={styles.LoginHeader}>Sign Up</h2>
                    <form onSubmit={handleSignup}>
                        <input value={username} onChange={(e) => setUsername(e.target.value)} type="text" placeholder="Enter Your Username" className={styles.InputField}/>
                        <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder="Enter Your Email" className={styles.InputField}/>
                        <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" placeholder="Enter Your Password" className={styles.InputField}/>
                        <button type="submit" className={styles.Button}>Sign Up</button>
                    </form>
                    <div className={styles.ButtomButtonDiv}>
                        <button onClick={handleLoginChange} className={styles.ToggleLogin}>Log In Instead</button>
                        <Link to="/">Back To Home</Link>
                    </div>
                </div>
            )}
        </div>
    );
}

export default LoginPage;
