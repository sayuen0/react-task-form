import React from "react";

import Task from "./Task";

const TaskList = props => {
  const columns = ["やること", "終わったかい?", "消すかい?", "できたかい?"];
  return (
    <table className="tasks">
      <tbody>
        {columns.map(col => (
          <th key={col}>{col}</th>
        ))}

        {props.tasks.map(task => {
          return (
            <Task
              key={task.id}
              task={task}
              deleteTask={props.deleteTask}
              putTask={props.putTask}
            ></Task>
          );
        })}
      </tbody>
    </table>
  );
};

export default TaskList;
