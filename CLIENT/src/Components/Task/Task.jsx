import styles from './Task.module.css'

function Task({ habit }){
    return (
        <div className={styles.MainTask}>
            <h2>{habit}</h2>
        </div>
    )
}

export default Task;