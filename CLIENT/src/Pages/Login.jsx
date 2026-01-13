import {useState} from "react";
import { Link } from "react-router-dom";
import styles from "../Css/Login.module.css";

function LoginPage(){
    const [isLogIn, setIsLogIn] = useState(true);

    function handleLoginChange(){
        setIsLogIn(!isLogIn);
    }

    return (
        <div className={styles.Container}>
            {isLogIn ? (
                <div className={styles.FormContainer}>
                    <form>
                        <input name="EmailLogIn" type="text" placeholder="Enter Your Email:" className={styles.InputField} />
                        <input name="PasswordLogIn" type="password" placeholder="Enter Your Password:" className={styles.InputField} />
                        <button type="Submit" className={styles.Button}>Login</button>
                    </form>
                    <div className={styles.ButtomButtonDiv}>
                        <button onClick={handleLoginChange} className={styles.ToggleLogin}>{isLogIn ? "Sign Up Instead" : "Log In Instead"}</button>
                        <Link to={"/"}>Back To Home</Link>
                    </div>
                </div>
            ) : (
                <div className={styles.FormContainer}>
                    <form>
                        <input name="EmailSignUp" type="text" placeholder="Enter Your Email:" className={styles.InputField} />
                        <input name="PasswordSignUp" type="password" placeholder="Enter Your Password:" className={styles.InputField} />
                        <input name="Username" type="text" placeholder="Enter Your username:" className={styles.InputField} />
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
