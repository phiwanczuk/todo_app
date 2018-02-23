import React, { Component } from 'react';
import {
        BrowserRouter as Router,
        Route
} from 'react-router-dom'
import {Grid} from 'react-bootstrap'
import AddTask from "./Components/AddTask/AddTask";
import {database} from "./firebase";
import MainMenu from './Components/MainMenu/MainMenu';
import Tasks from './Components/Tasks/Tasks'

class App extends Component {
  render() {
    return (
      <Router>
          <Grid>
          <MainMenu/>
          <Route exact path="/AddTask"
                 component={AddTask}/>
              <Route exact path="/Tasks"
                 component={Tasks}

              />
          </Grid>
      </Router>
    );
  }
}

export default App;
