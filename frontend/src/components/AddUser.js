import React, { Component } from 'react';
import axios from 'axios';

export default class AddUser extends Component {
  state = {
    users: [],
    username: '',
  };

  async componentDidMount() {
    await this.getUsers();
    console.log(this.state.users);
  }

  getUsers = async () => {
    const res = await axios.get('http://localhost:5000/api/users');

    this.setState({ users: res.data });
    console.log(res.data);
  };

  onChangeUsername = (e) => {
    this.setState({ username: e.target.value });
    // console.log(this.state.username);
  };

  onSubmit = async (e) => {
    e.preventDefault();

    const res = await axios.post('http://localhost:5000/api/users', {
      username: this.state.username,
    });
    // console.log(res);

    this.setState({ username: '' });
    this.getUsers();
  };

  deleteUser = async (id) => {
    await axios.delete(`http://localhost:5000/api/users/${id}`);
    // console.log(id);

    this.getUsers();
  };

  render() {
    return (
      <div className='row'>
        <div className='col-md-4'>
          <div className='card card-body'>
            <h3>Add New User</h3>
            <form onSubmit={this.onSubmit}>
              <div className='form-group'>
                <input
                  type='text'
                  className='form-control'
                  value={this.state.username}
                  onChange={this.onChangeUsername}
                />
              </div>
              <button type='submit' className='btn btn-primary'>
                Add User
              </button>
            </form>
          </div>
        </div>
        <div className='col-md-8'>
          <ul className='list-group'>
            {this.state.users.map((user) => (
              <li
                className='list-group-item list-group-item-action d-flex justify-content-between align-items-center'
                key={user._id}
              >
                {user.username}{' '}
                <button
                  type='delete'
                  className='btn ml-auto'
                  onClick={() => this.deleteUser(user._id)}
                >
                  x
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  }
}
