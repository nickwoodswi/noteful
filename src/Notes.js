import React, {Component} from 'react'
import './Notes.css'
import { Link } from 'react-router-dom'
import DeleteButton from './DeleteButton'
import PropTypes from 'prop-types'

class Notes extends Component {

    displayNote() {
        document.getElementById('note-content').classList.toggle('note-content')
    }
    
    render() {
        return(
            <div className="window">
                {this.props.notes.map(note => {
                    return(
                        <div className="note-preview" key={note.id + '-preview'}>
                            <Link 
                                to={"/notes/" + note.id}
                                key={note.id + '-link'}
                                id={note.id}
                                onClick={() => this.displayNote()}>
                                    <h3>{note.note_name}</h3>
                                    <h4>Date modified: {note.date_added}</h4>
                            </Link>
                            <DeleteButton 
                                key={note.id + '-delete'}
                                id={note.id} />
                            <div id="note-content" className="note-content-hidden" key={note.id + '-content'}><p>{note.content}</p></div>
                        </div>
                    )
                })}
            </div>
        )
    }
}

Notes.propTypes = {
    value: PropTypes.string
}

export default Notes