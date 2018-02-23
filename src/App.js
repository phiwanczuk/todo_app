import React, { Component } from 'react';
import {
        BrowserRouter as Router,
        Route
} from 'react-router-dom'
import {Grid} from 'react-bootstrap'
import AddTask from "./Components/AddTask/AddTask";
import {database} from "./firebase";
import MainMenu from './Components/MainMenu/MainMenu';


class App extends Component {
  render() {
    return (
      <Router>
          <Grid>
          <MainMenu/>
          <Route exact path="/"
                 component={AddTask}/>
          </Grid>
      </Router>
    );
  }
}

export default App;
