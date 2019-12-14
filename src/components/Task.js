import React from "react";

const Task = props => {
  return (
    <tr className="task" key={props.task.id}>
      {props.task.body}
      <td>
        <button
          className="put"
          onClick={() => {
            props.putTask(props.task.id);
          }}
        >
          更新
        </button>
      </td>

      <td>
        {" "}
        <button
          className="delete"
          onClick={() => props.deleteTask(props.task.id)}
        >
          削除
        </button>
      </td>
      <td>{String(props.task.done)}</td>
    </tr>
  );
};

export default Task;
