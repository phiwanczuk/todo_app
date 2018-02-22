import React, { Component } from 'react';
import {
        BrowserRouter as Router,
        Route
} from 'react-router-dom'
import {Grid} from 'react-bootstrap'
import AddTask from "./Components/AddTask/AddTask";
import {database} from "./firebase";


class App extends Component {
  render() {
    return (
      <Router>
          <Route path="/"
                 component={AddTask}/>
      </Router>
    );
  }
}

export default App;
