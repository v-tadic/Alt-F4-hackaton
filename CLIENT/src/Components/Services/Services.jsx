import styles from './Services.module.css'

function Services(){
    return (
        <div className={styles.Services}>
            <h2 className={styles.MainServiceHeading}>Our <span className={styles.Highlights}>Services</span></h2>
            <div className={styles.CardHolder}>
                <div className={styles.Card}>
                    <h3 className={styles.CardHeading}><span className={styles.Highlights}>Track Your Habits</span></h3>
                    <p className={styles.CardP}>Start building your daily routines by easily tracking your habits every day! Our app helps you stay consistent, monitor your progress, and achieve long-term goals through clear and simple reports.</p>
                </div>
                <div className={styles.Card}>
                    <h3 className={styles.CardHeading}><span className={styles.Highlights}>Boost Your Productivity</span></h3>
                    <p className={styles.CardP}>Improve your day by tracking important habits and tasks! Our app lets you monitor your successes and challenges, maintain focus, and increase productivity with motivating reminders and easy-to-read statistics.</p>
                </div>
                <div className={styles.Card}>
                    <h3 className={styles.CardHeading}><span className={styles.Highlights}>Strengthen Self-Discipline</span></h3>
                    <p className={styles.CardP}>Build lasting self-discipline and healthy habits! The app guides you step-by-step through daily activities, helping you stay motivated, track growth, and reach the results you want, at any time you want.</p>
                </div>
            </div>
        </div>
    )
}

export default Services;