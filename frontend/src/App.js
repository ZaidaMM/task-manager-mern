import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
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

      <Routes>
        <Route exact path='/' element={<Intro />} />
        <Route path='/list' element={<TasksList />} />
        <Route path='/edit/:id' element={<AddTask />} />
        <Route path='/add' element={<AddTask />} />
        <Route path='/user' element={<AddUser />} />
      </Routes>
    </Router>
  );
}

export default App;
