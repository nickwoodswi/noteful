import React, {Component} from 'react'
import './Notes.css'
import { Link } from 'react-router-dom'
import DeleteButton from './DeleteButton'

class Notes extends Component {
    displayNote() {
        document.getElementById('note-content').classList.toggle('note-content')
    }
    
    render() {
        return(
            <div className="window">
                {this.props.notes.map(note => {
                    return(
                        <>
                        <div className="note-preview">
                        <Link 
                            to={"/notes/" + note.id}
                            key={note.id}
                            id={note.id}
                            onClick={() => this.displayNote()}>
                                <h3>{note.name}</h3>
                                <h4>Date modified: {note.modified}</h4>
                        </Link>
                        <DeleteButton 
                            id={note.id} />
                        </div>
                        <div id="note-content" className="note-content-hidden"><p>{note.content}</p></div>
                        </>
                    )
                })}
            </div>
        )
    }
}

export default Notes