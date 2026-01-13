import styles from './Services.module.css'

function Services(){
    return (
        <div className={styles.Services}>
            <h2 className={styles.MainServiceHeading}>Our <span className={styles.Highlights}>Services</span></h2>
            <div className={styles.CardHolder}>
                <div className={styles.Card}>
                    <h3 className={styles.CardHeading}><span className={styles.Highlights}>Track your progress</span></h3>
                    <p className={styles.CardP}>Start your health and fitness journey by easily tracking all key metrics! Log your workouts, weight, calorie intake, and more. Our app helps you monitor your progress over time, giving you a clear view of your goals and the steps you're taking to achieve them.</p>
                </div>
                <div className={styles.Card}>
                    <h3 className={styles.CardHeading}><span className={styles.Highlights}>Track your progress</span></h3>
                    <p className={styles.CardP}>Start your health and fitness journey by easily tracking all key metrics! Log your workouts, weight, calorie intake, and more. Our app helps you monitor your progress over time, giving you a clear view of your goals and the steps you're taking to achieve them.</p>
                </div>
                <div className={styles.Card}>
                    <h3 className={styles.CardHeading}><span className={styles.Highlights}>Track your progress</span></h3>
                    <p className={styles.CardP}>Start your health and fitness journey by easily tracking all key metrics! Log your workouts, weight, calorie intake, and more. Our app helps you monitor your progress over time, giving you a clear view of your goals and the steps you're taking to achieve them.</p>
                </div>
            </div>
        </div>
    )
}

export default Services;