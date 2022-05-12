import React, { Component } from 'react';
import axios from 'axios';
import { format } from 'timeago.js';
import { Link } from 'react-router-dom';

export default class TasksList extends Component {
  state = {
    tasks: [],
  };

  componentDidMount() {
    this.getTasks();
  }

  async getTasks() {
    const res = await axios.get('http://localhost:5000/api/tasks');
    console.log(res);
    this.setState({ tasks: res.data });
  }

  deleteTask = async (id) => {
    await axios.delete(`http://localhost:5000/api/tasks/${id}`);
    console.log(id);
    this.getTasks();
  };

  render() {
    return (
      <div className='row'>
        {this.state.tasks.map((task) => (
          <div className='col-md-4 p-2' key={task._id}>
            <div className='card'>
              <div className='card-header'>
                <div className='lead'> {task.title}</div>
              </div>
              <div className='card-body'>
                <p>{task.content}</p>
                <p>{task.author}</p>
                <p className='small'>{format(task.date)}</p>
              </div>

              <div className='card-footer d-flex justify-content-between'>
                <Link className='btn btn-secondary' to={'/edit/' + task._id}>
                  Edit
                </Link>
                <button
                  className='btn btn-danger'
                  onClick={() => this.deleteTask(task._id)}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }
}
