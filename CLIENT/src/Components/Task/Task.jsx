import styles from "./Task.module.css";

function Task({ habit, done, onToggle, onDelete }) {
    return (
        <div className={styles.MainTask}>
            <input type="checkbox" checked={done === 1} onChange={onToggle}/>

            <h2 className={done === 1 ? styles.done : ""}>{habit}</h2>

            <button onClick={onDelete} className={styles.deleteBtn}>❌</button>
        </div>
    );
}

export default Task;
