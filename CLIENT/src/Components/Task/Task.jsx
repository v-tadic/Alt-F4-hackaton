import styles from "./Task.module.css";

function Task({ habit, done, streakGoal, currentStreak, onExtend, onDelete }) {
    const completed = streakGoal > 0 && currentStreak >= streakGoal;

    return (
        <div className={styles.taskCard}>
            <div className={styles.header}>
                <h2 className={done === 1 ? styles.done : ""}>{habit}</h2>
                <button className={styles.deleteBtn} onClick={onDelete}>✖</button>
            </div>

            {streakGoal > 0 && (
                <div className={styles.infoRow}>
                    <span className={styles.streak}>🔥 {currentStreak} / {streakGoal}</span>

                    {completed && (
                        <span className={styles.completed}>Completed ✅</span>
                    )}
                </div>
            )}

            {streakGoal > 0 && !completed && (
                <button className={styles.extendBtn} onClick={onExtend}>Extend streak</button>
            )}
        </div>
    );
}

export default Task;
