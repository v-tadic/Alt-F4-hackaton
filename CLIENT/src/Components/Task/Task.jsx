import styles from "./Task.module.css";

function Task({ habit, done, streakGoal, currentStreak, onExtend, onDelete }) {
    return (
        <div className={styles.MainTask}>
            <h2 className={done === 1 ? styles.done : ""}>{habit}</h2>

            {streakGoal > 0 && (
                <p>🔥 {currentStreak} / {streakGoal}</p>
            )}

            {streakGoal > 0 && currentStreak < streakGoal && (
                <button onClick={onExtend}>Extend streak</button>
            )}

            {streakGoal > 0 && currentStreak >= streakGoal && (
                <span>Completed ✅</span>
            )}

            <button onClick={onDelete}>❌</button>
        </div>
    );
}

export default Task;
