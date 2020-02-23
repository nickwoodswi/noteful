import React, {Component} from 'react'
import PropTypes from 'prop-types'
import FolderBoundary from './FolderBoundary'

class AddFolder extends Component {

render() {
    return(
        <div className="window">
            <FolderBoundary>
            <form className="add-folder" onSubmit={this.props.handleAddFolder}>
                <h2>Add a folder:</h2>
                <label htmlFor="folder-name">Folder Name:</label>
                <input 
                    required
                    type="text"
                    name="folder-name"
                    id="folder-name" />
                <button type="submit">Add Folder</button>
            </form>
            </FolderBoundary>
        </div>
    )
}

}

AddFolder.propTypes = {
    value: PropTypes.string
}

export default AddFolder