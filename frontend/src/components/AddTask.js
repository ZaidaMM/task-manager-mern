import React, { Component } from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

export default class AddTask extends Component {
  state = {
    users: [],
    userSelected: '',
    title: '',
    content: '',
    date: new Date(),
    isEditing: false,
    _id: '',
  };

  async componentDidMount() {
    // console.log(this.props.match.params);

    const res = await axios.get('http://localhost:5000/api/users');
    // console.log(res.data);
    this.setState({
      users: res.data.map((user) => user.username),
      userSelected: res.data[0].username,
    });
    // console.log(this.state.users);

    if (this.props.match.params.id) {
      const res = await axios.get(
        `http://localhost:5000/api/tasks/${this.props.match.params.id}`
      );
      // console.log(res.data);
      this.setState({
        title: res.data.title,
        content: res.data.content,
        date: new Date(res.data.date),
        author: res.data.user,
        isEditing: true,
        _id: this.props.match.params.id,
      });
    }
  }

  onSubmit = async (e) => {
    e.preventDefault();
    // console.log(this.state.title, this.state.content);

    if (this.state.isEditing) {
      const updatedTask = {
        title: this.state.title,
        content: this.state.content,
        date: this.state.date,
        author: this.state.userSelected,
      };
      await axios.put(
        `http://localhost:5000/api/tasks/${this.state._id}`,
        updatedTask
      );
    } else {
      const newTask = {
        title: this.state.title,
        content: this.state.content,
        date: this.state.date,
        author: this.state.userSelected,
      };
      await axios.post('http://localhost:5000/api/tasks', newTask);
    }

    window.location.href = '/list';
  };

  onInputChange = (e) => {
    // console.log(e.target.value);
    // console.log(this.state.userSelected);
    this.setState({ [e.target.name]: e.target.value });
    // console.log(e.target.name, e.target.value);
  };

  onChangeDate = (date) => {
    this.setState({ date });
  };

  render() {
    return (
      <div className='col-md-6 offset-md-3'>
        <div className='card card-body'>
          <h4>Add Task</h4>
          <form onSubmit={this.onSubmit}>
            {/** SELECT USER */}
            <div className='form-group'>
              <select
                name='userSelected'
                id='userSelected'
                className='form-control'
                onChange={this.onInputChange}
                value={this.state.userSelected}
              >
                {/* <option>Select User</option> */}
                {this.state.users.map((user) => (
                  <option key={user} value={user}>
                    {user}
                  </option>
                ))}
              </select>
            </div>
            <div className='form-group'>
              <input
                type='text'
                className='form-control'
                placeholder='Title'
                name='title'
                onChange={this.onInputChange}
                required
                value={this.state.title}
              />
            </div>
            <div className='form-group'>
              <textarea
                type='text'
                className='form-control'
                placeholder='Content'
                name='content'
                onChange={this.onInputChange}
                required
                value={this.state.content}
              ></textarea>
            </div>
            <div className='form-group'>
              <DatePicker
                className='form-control'
                selected={this.state.date}
                onChange={this.onChangeDate}
              />
            </div>
            <button type='submit' className='btn btn-primary'>
              Save Task
            </button>
          </form>
        </div>
      </div>
    );
  }
}
