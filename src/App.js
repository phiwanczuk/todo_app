import React, { Component } from 'react';
import {
        BrowserRouter as Router,
        Route
} from 'react-router-dom'
import {Grid} from 'react-bootstrap'
import AddTask from "./Components/AddTask/AddTask";
import MainMenu from './Components/MainMenu/MainMenu';
import Tasks from './Components/Tasks/Tasks'
import FinishedTasks from './Components/FinishedTasks/FinishedTasks'
import Check from './Components/Check/Check.js'

class App extends Component {
  render() {
    return (
      <Router>
          <Grid>
          <MainMenu/>
              <Route exact path='/' component={Tasks}/>
              <Route exact path="/AddTask" component={AddTask}/>
              <Route exact path="/FinishedTasks" component={FinishedTasks}/>
              <Route exact path="/Check" component={Check}/>
          </Grid>
      </Router>
    );
  }
}

export default App;
