import {useState} from "react";
import { Link } from "react-router-dom";
import styles from "../Css/Login.module.css";

function LoginPage(){
    const [isLogIn, setIsLogIn] = useState(true);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [username, setUsername] = useState("");

    function handleLoginChange(){
        setIsLogIn(!isLogIn);
    }

    function handleEmailChange(e){
        setEmail(e.target.value);
    }

    function handlePasswordChange(e){
        setPassword(e.target.value);
    }

    function handleUsernameChange(e){
        setUsername(e.target.value);
    }

    function handleSubmit(e){
        e.preventDefault();
        setEmail("");
        setPassword("");
        setUsername("");
    }

    return (
        <div className={styles.Container}>
            {isLogIn ? (
                <div className={styles.FormContainer}>
                    <h2 className={styles.LoginHeader}>Log In/Sign Up</h2>
                    <form onSubmit={handleSubmit}>
                        <input value={email} onChange={handleEmailChange} name="EmailLogIn" type="text" placeholder="Enter Your Email:" className={styles.InputField} />
                        <input value={password} onChange={handlePasswordChange} name="PasswordLogIn" type="password" placeholder="Enter Your Password:" className={styles.InputField} />
                        <button type="Submit" className={styles.Button}>Login</button>
                    </form>
                    <div className={styles.ButtomButtonDiv}>
                        <button onClick={handleLoginChange} className={styles.ToggleLogin}>{isLogIn ? "Sign Up Instead" : "Log In Instead"}</button>
                        <Link to={"/"}>Back To Home</Link>
                    </div>
                </div>
            ) : (
                <div className={styles.FormContainer}>
                    <h2 className={styles.LoginHeader}>Log In/Sign Up</h2>
                    <form onSubmit={handleSubmit}>
                        <input value={email} onChange={handleEmailChange} name="EmailSignUp" type="text" placeholder="Enter Your Email:" className={styles.InputField} />
                        <input value={password} onChange={handlePasswordChange} name="PasswordSignUp" type="password" placeholder="Enter Your Password:" className={styles.InputField} />
                        <input value={username} onChange={handleUsernameChange} name="Username" type="text" placeholder="Enter Your username:" className={styles.InputField} />
                        <button type="Submit" className={styles.Button}>Sign Up</button>
                    </form>
                    <div className={styles.ButtomButtonDiv}>
                        <button onClick={handleLoginChange} className={styles.ToggleLogin}>{isLogIn ? "Sign Up Instead" : "Log In Instead"}</button>
                        <Link to={"/"}>Back To Home</Link>
                    </div>
                </div>
            )}
        </div>
    );
}

export default LoginPage;
