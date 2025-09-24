import "../css/taskCard.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRemove } from "@fortawesome/free-solid-svg-icons";

// import { useState } from "react";

function TaskCard({ task , onToggleCompletion ,deleteTask }) {

  const handleToggle = () => {
    onToggleCompletion(task.id);
  };


  return (
    <div className={`task-card ${task.completed ? "completed" : ""}`}>
      <div className="task-header">
        <input
          type="checkbox"
          checked={task.completed}
          onChange={handleToggle}
        />
        <h3 className="task-name">{task.title}</h3>
        <button className="icon-button" onClick={() => deleteTask(task.id)}>
          <FontAwesomeIcon icon={faRemove} />
        </button>
      </div>
      <p className="task-desc">{task.description}</p>
    </div>
  );
}

export default TaskCard;
