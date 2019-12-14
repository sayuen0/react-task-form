import React, {Component} from "react";
import uuidv4 from "uuid/v4";

import TaskForm from "./components/TaskForm"
import TaskList from "./components/TaskList"


// const DATABASE_PATH = process.env.DATABASE_PATH;
const DATABASE_PATH = "http://localhost:3001/tasks";

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tasks: [
        {
          id: 1,
          body: "とりあえず表示",
          done: false,
          created_at: null,
          updated_at: null
        },
        {
          id: 2,
          body: "我々書き換えられる運命",
          done: false,
          created_at: null,
          updated_at: null
        }
      ],
      form: {
        formText: "",
        sortby: "created_at"
      }
    };
  }
  componentDidMount() {
    this.fetchTasks();
  }

  changeText = e => {
    const inputText = e.target.value;
    this.setState({formText: inputText});
  };

  changeSort=(by)=> {
    console.log(by);
    // const tasks = this.state.tasks.slice();
    // tasks.sort((a, b) => {
    //   if (a[by] < b[by]) {
    //     return -1;
    //   } else if (a[by] > b[by]) {
    //     return 1;
    //   }else{
    //     return 0
    //   }
    // });
    this.setState({
      form: {
        sortby: by
      }
    });
    fetch(`${DATABASE_PATH}?_sort=${by}&_order=asc`)
      .then(res => res.json())
      .then(tasks => {
        this.setState({
          tasks,
          form: {
            sortby: by
          }
        });
      });
  }

  fetchTasks = () => {
    fetch(DATABASE_PATH)
      .then(res => res.json())
      .then(json => {
        this.setState({tasks: json});
      });
  };
  submitTask = () => {
    // console.log(this.state.inputText);
    fetch(DATABASE_PATH, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        body: this.state.formText,
        id: uuidv4(),
        done: false,
        created_at: new Date(),
        updated_at: new Date()
      })
    }).then(this.fetchTasks);
    this.setState({
      formText: ""
    });
  };

  putTask = taskId => {
    const task = this.state.tasks.find(element => element.id === taskId);
    task.done = !task.done;
    task.updated_at = new Date();

    fetch(DATABASE_PATH + "/" + taskId, {
      method: "PUT",

      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(task)
    }).then(this.fetchTasks);
  };

  deleteTask = taskId => {
    fetch(DATABASE_PATH + "/" + taskId, {
      method: "DELETE"
    }).then(this.fetchTasks);
  };

  render() {
    return (
      <div className="app">
        <TaskList
          tasks={this.state.tasks}
          deleteTask={this.deleteTask}
          putTask={this.putTask}
        ></TaskList>
        <TaskForm
          tasks={this.state.tasks}
          changeText={this.changeText}
          formText={this.state.formText}
          submitTask={this.submitTask}
          sortby={this.state.form.sortby}
          changeSort={this.changeSort}
        ></TaskForm>
        {/* <div className="sort-btns">{radios}</div> */}
      </div>
    );
  }
}



