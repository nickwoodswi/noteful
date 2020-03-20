import React, {Component} from 'react'
import PropTypes from 'prop-types'
import NoteBoundary from './NoteBoundary'

class AddNote extends Component {

render() {
    return(
        <div className="window">
            <NoteBoundary>
            <form className="add-note" onSubmit={this.props.handleAddNote}>
                <h2>Add a note:</h2>
                <div className="note-name">
                    <label htmlFor="note-name">Note Name:</label>
                    <input 
                        required
                        type="text"
                        name="note-name"
                        id="note-name" />
                </div>
                <div className="note-content">
                    <label htmlFor="note-content">Note Content:</label>
                    <input 
                        required
                        type="text"
                        name="note-content"
                        id="note-content" />
                </div>
                <div>
                    Select Folder:
                    <select id="folder" 
                        required
                        className="select-folder">
                        {this.props.folders.map((folder, idx) => {
                            return(
                                <option key={idx} value={folder.id} id="folder-name">{folder.folder_name}</option>
                            )
                        })}
                    </select>
                </div>
            <button type="submit">Add Note</button>
        </form>
        </NoteBoundary>
    </div>
    )
}

}

AddNote.propTypes = {
    value: PropTypes.string
}

export default AddNote