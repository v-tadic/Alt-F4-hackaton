import { useState, useEffect } from "react";
import Task from "../Components/Task/Task.jsx";
import styles from "../Css/MainApp.module.css";

const API_URL = "http://localhost:3000";

function MainApp() {
    const [tasks, setTasks] = useState([]);
    const [newTask, setNewTask] = useState("");

    useEffect(() => {
        const fetchTasks = async () => {
            try {
                const res = await fetch(`${API_URL}/activities`);
                const data = await res.json();
                setTasks(data);
            } catch (err) {
                console.error(err);
            }
        };

        fetchTasks();
    }, []);

    const AddTask = async (e) => {
        e.preventDefault();
        if (newTask.trim() === "") return;

        try {
            const res = await fetch(`${API_URL}/activities`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ text: newTask }),
            });

            const data = await res.json();
            setTasks([...tasks, data]);
            setNewTask("");
        } catch (err) {
            console.error(err);
        }
    };

    const toggleDone = async (id, done) => {
        try {
            await fetch(`${API_URL}/activities/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ done: done ? 0 : 1 }),
            });

            setTasks(
                tasks.map(task =>
                    task.id === id
                        ? { ...task, done: done ? 0 : 1 }
                        : task
                )
            );
        } catch (err) {
            console.error(err);
        }
    };

    const deleteTask = async (id) => {
        try {
            await fetch(`${API_URL}/activities/${id}`, {
                method: "DELETE",
            });

            setTasks(tasks.filter(task => task.id !== id));
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div className={styles.Holder}>
            <div className={styles.content}>
                <form onSubmit={AddTask} className={styles.Form}>
                    <input type="text" placeholder="Add new habit" value={newTask} onChange={(e) => setNewTask(e.target.value)}/>
                    <button type="submit" className={styles.SubmitButton}>Add Habit</button>
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
