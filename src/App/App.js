import React, { Component }from 'react';
import { Route, Link } from 'react-router-dom';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import NoteListNav from '../NoteListNav/NoteListNav';
import NotePageNav from '../NotePageNav/NotePageNav';
import NoteListMain from '../NoteListMain/NoteListMain';
import NotePageMain from '../NotePageMain/NotePageMain';
import dummyStore from '../dummy-store';
import {getNotesForFolder, findNote, findFolder} from '../notes-helpers';
import './App.css';

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

  renderMainRoutes() {
    const {notes, folders} = this.state;
    return (
        <>
          {['/', '/folder/:folderId'].map(path => (
              <Route
                  exact
                  key={path}
                  path={path}
                  render={routeProps => {
                    const {folderId} = routeProps.match.params;
                    const notesForFolder = getNotesForFolder(
                        notes,
                        folderId
                    );
                    return (
                        <NoteListMain
                            {...routeProps}
                            notes={notesForFolder}
                        />
                    );
                  }}
              />
          ))}
          <Route
              path="/note/:noteId"
              render={routeProps => {
                const {noteId} = routeProps.match.params;
                const note = findNote(notes, noteId);
                return <NotePageMain {...routeProps} note={note} />;
              }}
          />
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