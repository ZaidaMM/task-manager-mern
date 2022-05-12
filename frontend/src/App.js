import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

import './App.css';
import Navigation from './components/Navigation';
import Intro from './components/Intro';
import TasksList from './components/TasksList';
import AddTask from './components/AddTask';
import AddUser from './components/AddUser';

function App() {
  return (
    <Router>
      <Navigation />
      <div className='container p-4'>
        <Route exact path='/' component={Intro} />
        <Route path='/list' component={TasksList} />
        <Route path='/edit/:id' component={AddTask} />
        <Route path='/add' component={AddTask} />
        <Route path='/user' component={AddUser} />
      </div>
    </Router>
  );
}

export default App;
