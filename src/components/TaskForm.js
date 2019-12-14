import React from "react";

const TaskForm = props => {
  const selects = ["created_at", "updated_at", "body", "done"];
  const radios = selects.map(select => {
    return (
      <div key={select}>
        <label htmlFor={`radio_${select}`}>{select}</label>
        <input
          type="radio"
          name="aradio"
          id={`radio_${select}`}
          value={select}
          checked={props.sortby === select}
          onChange={()=>props.changeSort(select)}
        />
      </div>
    );
  });
    
  return(
  
  <form id="task-form">
    <input
      type="text"
      name=""
      onChange={props.changeText}
      value={props.formText}
      id="task-input"
    />
    <button type="submit" onClick={props.submitTask}>
      submit
    </button>
    {radios}
  </form>
  
)};


export default TaskForm
