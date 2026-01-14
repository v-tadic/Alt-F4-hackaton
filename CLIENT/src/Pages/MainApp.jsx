import { useState, useEffect } from "react";
import Task from "../Components/Task/Task.jsx";
import styles from "../Css/MainApp.module.css";

const API_URL = "http://localhost:3000";

function MainApp() {
    const [tasks, setTasks] = useState([]);
    const [newTask, setNewTask] = useState("");

    useEffect(() => {
        fetch(`${API_URL}/activities`)
            .then(res => res.json())
            .then(data => setTasks(data))
            .catch(err => console.error(err));
    }, []);

    function AddTask(e) {
        e.preventDefault();
        if (newTask.trim() === "") return;

        fetch(`${API_URL}/activities`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ text: newTask })
        })
            .then(res => res.json())
            .then(data => {
                setTasks([...tasks, data]);
                setNewTask("");
            });
    }

    function toggleDone(id, done) {
        fetch(`${API_URL}/activities/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ done: done ? 0 : 1 })
        }).then(() => {
            setTasks(tasks.map(task =>
                task.id === id ? { ...task, done: done ? 0 : 1 } : task
            ));
        });
    }

    function deleteTask(id) {
        fetch(`${API_URL}/activities/${id}`, {
            method: "DELETE"
        }).then(() => {
            setTasks(tasks.filter(task => task.id !== id));
        });
    }

    return (
        <div className={styles.Holder}>
            <div className={styles.content}>
                <form onSubmit={AddTask} className={styles.Form}>
                    <input type="text" placeholder="Add new habit" value={newTask} onChange={(e) => setNewTask(e.target.value)}/>
                    <button type="submit">Add Habit</button>
                </form>

                <div className={styles.taskList}>
                    {tasks.map(task => (
                        <div key={task.id} className={styles.taskItem}>
                            <Task habit={task.text} done={task.done} onToggle={() => toggleDone(task.id, task.done)} onDelete={() => deleteTask(task.id)}/>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default MainApp;
