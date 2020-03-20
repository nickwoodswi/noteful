import React, {Component} from 'react';
import './App.css'
import Sidebar from './Sidebar'
import Notes from './Notes'
import { Route } from 'react-router-dom'
import { Link } from 'react-router-dom'
import Context from './Context'
import AddFolder from './AddFolder'
import AddNote from './AddNote'

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

  makeNewFolder(e) {
    e.preventDefault()
    let folderName = e.target['folder-name'].value
    let id = Math.random().toString(36).substring(7)
    this.handleAddFolder(id, folderName);
    e.target.reset()
  }
  
  handleAddFolder(id, folderName) {
    let newFolder = {'id': id, 'folder_name': folderName}
    fetch(`http://localhost:9090/folders/`, {
      method: 'POST',
      body: JSON.stringify(newFolder),
      headers: {
        "Content-Type": "application/json",
      },
    })
    .then(response => response.json())
    .then(folder => {
      this.setState({
        folders: this.state.folders.concat(folder)
      })
    })
  }

  makeNewNote(e) {
    e.preventDefault()

    let noteName = e.target['note-name'].value
    let noteContent = e.target['note-content'].value
    //let noteId = Math.random().toString(36).substring(7)
    let folderIdStr = e.target['folder'].value
    let folderId = parseInt(folderIdStr, 10)
    let timeStamp = new Date() 

    this.handleAddNote(noteName, noteContent, folderId, timeStamp);

    e.target.reset()
  }

  handleAddNote(noteName, noteContent, folderId, timeStamp) {
    let newNote = {'note_name': noteName, 'date_added': timeStamp, 'folder': folderId, 'content': noteContent}
    console.log(newNote)
    fetch(`http://localhost:9090/notes/`, {
      method: 'POST',
      body: JSON.stringify(newNote),
      headers: {
        "Content-Type": "application/json",
      },
    })
    .then(response => response.json())
      .then(note => { 
        this.setState({
          notes: this.state.notes.concat(note)
        })
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
          <nav>
            <div className="add-components">
              <div className="add-folder"><Link to='/add-folder'>Add Folder</Link></div>
              <div className="add-note"><Link to='/add-note'>Add Note</Link></div>
            </div>
          </nav>

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
                notes={
                  this.state.notes.filter(note => note.folder == 
                  routeProps.match.params.id)
                } 
                  />
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
                  note.id == routeProps.match.params.id)} />
              </>
              )} />
            
            <Route path='/add-folder' render={routeProps => (
              <>
              <Sidebar
                key={this.state.folders.id}
                folders={this.state.folders}
                clickHandler={this.selectFolder} />
                <AddFolder
                  handleAddFolder={(e) => this.makeNewFolder(e)} />
              </>
            )} />

            <Route path='/add-note' render={routeProps => (
              <>
              <Sidebar
                key={this.state.folders.id}
                folders={this.state.folders}
                clickHandler={this.selectFolder} />
                <AddNote 
                  folders={this.state.folders}
                  handleAddNote={(e) => this.makeNewNote(e)} />
              </>
            )} />

          </main>
        </div>
      </Context.Provider>
    )
  }
}

export default App;