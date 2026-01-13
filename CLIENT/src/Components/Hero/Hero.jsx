import styles from './Hero.module.css'
import { Link } from 'react-router-dom'

function Hero() {
    return (
        <div className={styles.Hero}>
            <h1 className={styles.HeroHeading}>Unleash your <span className={styles.Highlight}>potential</span></h1>
            <h2 className={styles.HeroQuote}>Follow your <span className={styles.Highlight}>progress</span> and accomplish your <span className={styles.Highlight}>goals</span></h2>
            <Link to={'/login'}><button className={styles.CtaButton}>Start now</button></Link>
        </div>
    )
}

export default Hero;