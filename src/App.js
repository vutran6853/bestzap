import React, { Component } from 'react';
import { HashRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import Route from './route';
import store from './duck/store';


class App extends Component {
  render() {
    return (
      <Provider store={ store }>
        <HashRouter>
          <div className="App">
            { Route }
          </div>
        </HashRouter>
      </Provider>
      
    );
  }
}

export default App;
