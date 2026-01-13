import styles from './FinalCta.module.css';
import { Link } from "react-router-dom";

function FinalCta() {
    return (
        <div className={styles.FinalCta}>
            <h3>Ready to take control of your <span className={styles.Highlight}>health</span>?</h3>
            <Link to={"/login"}><button>Press to start!</button></Link>
        </div>
    )
}

export default FinalCta;