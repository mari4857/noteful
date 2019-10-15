import React, { Component }from 'react';
import { Route } from 'react-router-dom';
import dummyStore from '../dummy-store';

class App extends Component {
  state = {
    folders: [],
    notes: []
  };

  render() {
    return (
        <div className='app'>
          <nav className='app-nav'>
            <h1>Noteful app nav</h1>
          </nav>
          <header className='app-header'>
            <p>App header</p>
          </header>
          <main className='app-main'>
            <p>App main</p>
          </main>
        </div>
    );
  }
}

export default App;