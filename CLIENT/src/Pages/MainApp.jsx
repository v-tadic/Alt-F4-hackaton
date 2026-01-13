import { useState } from "react";
import Task from "../Components/Task/Task.jsx";
import styles from "../Css/MainApp.module.css";

function MainApp() {
    const [tasks, setTasks] = useState([

    ]);

    const [newTask, setNewTask] = useState("");


    function AddTask(e) {
        e.preventDefault();
        if (newTask === "") {
            return;
        }
        setTasks([...tasks, { habit: newTask }]);
        setNewTask("");
    }

    return (
        <div className={styles.Holder}>
            <div className={styles.content}>
                <form onSubmit={AddTask} className={styles.Form}>
                    <input type="text" placeholder="Add new habit" value={newTask} onChange={(e) => setNewTask(e.target.value)}/>
                    <button type="submit">Add Habit</button>
                </form>
                <div className={styles.taskList}>
                    {tasks.map((task, index) => (
                        <div key={index} className={styles.taskItem}>
                            <Task habit={task.habit} />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default MainApp;
