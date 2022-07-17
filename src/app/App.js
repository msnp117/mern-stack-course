import React, { Component } from "react";

class App extends Component {
  constructor() {
    super(); //heredar funcionalidades que nos da el componente
    this.state = {
      title: "",
      description: "",
      tasks: [],
      _id: "",
    };
    this.addTask = this.addTask.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  addTask(e) {
    if (this.state._id) {
        fetch(`/api/tasks/${this.state._id}`, {
            method: 'put',
            body: JSON.stringify(this.state),
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
              },
        })
        .then(res => res.json())
        .then(data => {
            console.log(data)
            M.toast({ html: "Task updated" });
          this.setState({ title: "", description: "", _id: "" });
          this.fetchTasks();
        })
    } else {
        //enviar peticiones http a nuestro servidor
    fetch("/api/tasks", {
        method: "post",
        // stringify => convertir a string un objeto
        body: JSON.stringify(this.state),
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          //funcion de materialize para mostrar un mensaje por pantalla
          M.toast({ html: "Task saved" });
          this.setState({ title: "", description: "" });
          this.fetchTasks();
        })
        .catch((err) => console.error(err));
    }
    e.preventDefault();
  }

  //   ejecuta algo apenas la aplicacion carga
  componentDidMount() {
    console.log("El componente fue montado");
    this.fetchTasks();
  }

  fetchTasks() {
    fetch("api/tasks")
      .then((res) => res.json())
      .then((data) => {
        this.setState({ tasks: data });
        console.log(this.state.tasks);
      });
  }

  deleteTask(id) {
    if (window.confirm("Are you sure you want to delete it?")) {
      fetch(`/api/tasks/${id}`, {
        method: "delete",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          M.toast({ html: "Task deleted" });
          this.fetchTasks();
        });
    }
  }

  editTask(id) {
    fetch(`/api/tasks/${id}`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        this.setState({
          title: data.title,
          description: data.description,
          _id: data._id
        });
      });
  }

  handleChange(e) {
    const { name, value } = e.target;
    this.setState({
      [name]: value,
    });
  }

  render() {
    return (
      <div>
        {/* NAVIGATION */}
        <nav className="light-blue darken-4">
          <div className="container">
            <a href="/" className="brand-logo">
              MERN stack
            </a>
          </div>
        </nav>

        <div className="container">
          <div className="row">
            <div className="col s5">
              <div className="card">
                <div className="card-content">
                  <form onSubmit={this.addTask}>
                    <div className="row">
                      <div className="input-field col s12">
                        <input
                          name="title"
                          onChange={this.handleChange}
                          type="text"
                          placeholder="Task Title"
                          value={this.state.title}
                        />
                      </div>
                    </div>

                    <div className="row">
                      <div className="input-field col s12">
                        <textarea
                          name="description"
                          onChange={this.handleChange}
                          className="materialize-textarea"
                          placeholder="Task Description"
                          value={this.state.description}
                        ></textarea>
                      </div>
                    </div>

                    <button type="submit" className="btn light-blue darken-4">
                      Send
                    </button>
                  </form>
                </div>
              </div>
            </div>
            <div className="col s7">
              <table>
                <thead>
                  <tr>
                    <th>Title</th>
                    <th>Description</th>
                    <th>Operations</th>
                  </tr>
                </thead>
                <tbody>
                  {this.state.tasks.map((task) => {
                    return (
                      <tr key={task._id}>
                        <td>{task.title}</td>
                        <td>{task.description}</td>
                        <td>
                          <button
                            className="btn light-blue darken-4"
                            style={{ margin: "4px" }}
                            onClick={() => this.deleteTask(task._id)}
                          >
                            <i className="material-icons">delete</i>
                          </button>
                          <button
                            className="btn light-blue darken-4"
                            onClick={() => this.editTask(task._id)}
                          >
                            <i className="material-icons">edit</i>
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
