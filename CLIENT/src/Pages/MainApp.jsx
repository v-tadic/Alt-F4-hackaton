import { useState, useEffect } from "react";
import Task from "../Components/Task/Task.jsx";
import styles from "../Css/MainApp.module.css";

const API_URL = "http://localhost:3000";

function MainApp() {
    const [tasks, setTasks] = useState([]);
    const [newTask, setNewTask] = useState("");
    const [streakGoal, setStreakGoal] = useState(0);

    const userId = localStorage.getItem("userId");

    useEffect(() => {
        if (!userId) return;

        const fetchTasks = async () => {
            const res = await fetch(`${API_URL}/activities/${userId}`);
            const data = await res.json();
            setTasks(data);
        };

        fetchTasks();
    }, [userId]);

    const AddTask = async (e) => {
        e.preventDefault();
        if (!newTask.trim()) return;

        if (streakGoal === 0) {
            setStreakGoal(1);
        }

        const res = await fetch(`${API_URL}/activities`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                text: newTask,
                userId: parseInt(userId),
                streak_goal: parseInt(streakGoal)
            })
        });

        const data = await res.json();
        setTasks([...tasks, data]);
        setNewTask("");
        setStreakGoal(0);
    };

    const extendStreak = async (id) => {
        const res = await fetch(`${API_URL}/activities/${id}/done`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ done: 1 })
        });

        const data = await res.json();

        setTasks(tasks.map(task =>
            task.id === id
                ? { ...task, done: 1, current_streak: data.current_streak }
                : task
        ));
    };

    const deleteTask = async (id) => {
        await fetch(`${API_URL}/activities/${id}`, { method: "DELETE" });
        setTasks(tasks.filter(task => task.id !== id));
    };

    return (
        <div className={styles.Holder}>
            <div className={styles.content}>
                <form onSubmit={AddTask} className={styles.Form}>
                    <h3 className={styles.headings}>Enter habit:</h3>
                    <input type="text" placeholder="Add new habit" value={newTask} onChange={(e) => setNewTask(e.target.value)}/>
                    <h3 className={styles.headings}>Enter Streak Goal:</h3>
                    <input type="number" placeholder="Streak goal" value={streakGoal} onChange={(e) => setStreakGoal(e.target.value)} min="0"/>

                    <button type="submit" className={styles.SubmitButton}>Add Habit</button>
                </form>

                <div className={styles.taskList}>
                    {tasks.map(task => (
                        <Task key={task.id} habit={task.text} done={task.done} streakGoal={task.streak_goal} currentStreak={task.current_streak} onExtend={() => extendStreak(task.id)} onDelete={() => deleteTask(task.id)}/>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default MainApp;
