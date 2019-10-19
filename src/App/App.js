import React, { Component }from 'react';
import { Route } from 'react-router-dom';
import NoteListNav from '../NoteListNav/NoteListNav';
import NotePageNav from '../NotePageNav/NotePageNav';
import {getNotesForFolder, findNote, findFolder} from '../notes-helpers';
import dummyStore from '../dummy-store';

class App extends Component {
  state = {
    folders: [],
    notes: []
  };

  componentDidMount() {
    // fake date loading from API call
    setTimeout(() => this.setState(dummyStore), 600);
  }

  renderNavRoutes() {
    const {folders, notes} = this.state;
    return (
      <>
        {['/', '/folder/:folderId'].map(path => (
          <Route
            exact
            key={path}
            path={path}
            render={routeProps => (
              <NoteListNav
                folders={folders}
                notes={notes}
                {...routeProps}
              />
            )}
          />
        ))}
        <Route
          path="/note/:noteId"
          render={routeProps => {
            const {noteId} = routeProps.match.params;
            const note = findNote(notes, noteId) || {};
            const folder = findFolder(folders, note.folderId);
            return <NotePageNav {...routeProps} folder={folder} />;
          }}
        />
        <Route path="/add-folder" component={NotePageNav} />
        <Route path="/add-note" component={NotePageNav} />
      </>
    );
  }

  render() {
    return (
        <div className='app'>
          <nav className='app-nav'>{this.renderNavRoutes()}</nav>
          <header className='app-header'>
            <h1>Noteful app header</h1>
          </header>
          <main className='app-main'>
            <p>App main</p>
          </main>
        </div>
    );
  }
}

export default App;