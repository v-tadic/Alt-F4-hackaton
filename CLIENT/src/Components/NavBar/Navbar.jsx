import { Link } from "react-router-dom";
import styles from "./NavBar.module.css";

function NavBar(){
    return (
        <div className={styles.NavBar}>
            <p className={styles.Aplikacija}>Habitly</p>
            <div className={styles.Links}>
                {localStorage.getItem("username") ? localStorage.getItem("username") : <Link to="/login"><p>Login</p></Link>}
            </div>
        </div>
    )
}

export default NavBar;