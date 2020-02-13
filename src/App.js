import React, {Component} from 'react';
import './App.css'
import Sidebar from './Sidebar'
import Notes from './Notes'
import { Route } from 'react-router-dom'
import { Link } from 'react-router-dom'
import Context from './Context'

class App extends Component {

  constructor() {
    super()
    this.state = {
      folders: [],
      notes: [],
    }
    this.handleDeleteNote = this.handleDeleteNote.bind(this)
  }

  componentDidMount() {

    fetch('http://localhost:9090/folders')
      .then(response => response.json())
      .then(data => this.setState({
        folders: data
      }))

    fetch('http://localhost:9090/notes')
      .then(response => response.json())
      .then(data => this.setState({
        notes: data
      }))

  }

  handleDeleteNote(id) {
    this.setState({
      notes: this.state.notes.filter(note => note.id !== id)
    })
  }

  render() {

    const contextValue = {
      folders: this.state.folders,
      notes: this.state.notes,
      deleteNote: this.handleDeleteNote
    }

    return (
      <Context.Provider
        value={contextValue}>
        <div className="pagewrapper">
          <header className="header">
            <Link to='/'><h1>NOTEFUL</h1></Link>
          </header>
          <main className='App'>

            <Route exact path='/' render={props => (
              <>
              <Sidebar 
                key={this.state.folders.id}
                folders={this.state.folders}
                clickHandler={this.selectFolder} />
              <Notes 
                key={this.state.notes.id}
                notes={this.state.notes}
                 />
              </>
            )} />

            <Route path='/folders/:id' render={routeProps => (
              <>
              <Sidebar 
                key={this.state.folders.id}
                folders={this.state.folders}
                clickHandler={this.selectFolder} />
              <Notes 
                key={this.state.notes.id}
                notes={this.state.notes.filter(note => 
                  note.folderId === routeProps.match.params.id)} />
              </>
              )} />

            <Route path='/notes/:id' render={routeProps => (
              <>
              <Sidebar 
                key={this.state.folders.id}
                folders={this.state.folders}
                clickHandler={this.selectFolder} />
              <Notes 
                key={this.state.notes.id}
                notes={this.state.notes.filter(note =>
                  note.id === routeProps.match.params.id)} />
              </>
              )} />

          </main>
        </div>
      </Context.Provider>
    )
  }
}

export default App;