import TaskCard from "../components/taskCard";
import Navbar from "../components/navbar";
import { useState, useEffect } from "react";
import { getAllTasks } from "../services/tasks";
import { updateTask ,deleteTask } from "../services/tasks";

function HomePage() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [activeTab, setActiveTab] = useState('all');

  const getTasks = async () => {
    try {
      const res = await getAllTasks();
      console.log(res.data.data);
      
      setData(res.data.data);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to get tasks");
    } finally {
      setLoading(false);
    }
  };

  const toggleTaskCompletion = async (taskId) => {
    setLoading(true);
  try {
    const updatedTasksPromises = data.map(async (task) => {

      if (task.id === taskId) {
        const res = await updateTask(task.id, task.title, task.description, !task.completed);
        return res.data.data; 
      }
      return task; 
    });

    const updatedData = await Promise.all(updatedTasksPromises);

    setData(updatedData);
  } catch (error) {
    console.error("Error updating task:", error);
  } finally {
    setLoading(false);
  }
};

const deleteTaskFunction = async (taskId) => {
  setLoading(true);
  try {

    await deleteTask(taskId); // تأكد من أن هذه هي الدالة الصحيحة اللي بتحذف من الـ API

    const updatedData = data.filter(task => task.id !== taskId);

    setData(updatedData);

  } catch (error) {
    console.error("Error deleting task:", error);

  } finally {
    setLoading(false);
  }
};

  useEffect(() => {
    getTasks();
  }, []);

  const filteredTasks = data.filter(task => {
    if (activeTab === 'completed') {
      return task.completed;
    }else if(activeTab==="in-progress"){
      return !task.completed;
    }
    return true;
  });

  return (
    <div className="home-page">
      <header>
        <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />
      </header>
      
      {loading ? (
        <div className="loader"></div>
      ) : error !== "" ? (
        <div className="error-text">
          <p>{error}</p>
        </div>
      ) : (
        <div className="data-list">
          {filteredTasks.map((e) => (
          <TaskCard key={e.id} task={e} onToggleCompletion={toggleTaskCompletion} deleteTask={deleteTaskFunction} />
        ))}
        </div>
      )}
    </div>
  );
}

export default HomePage;