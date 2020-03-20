import React, {Component} from 'react'
import './Sidebar.css'
import { NavLink } from 'react-router-dom'
import './Sidebar.css'
import PropTypes from 'prop-types'

class Sidebar extends Component {

    render() {
        return(
            <div className="sidebar">
                <div className="note-list">
                    <h2>FOLDERS:</h2>
                    {this.props.folders.map(folder => {
                        return(
                            <NavLink                           
                                to={'/folders/' + folder.id}
                                id={folder.id}
                                key={folder.id}
                                className="folder" >
                                    {folder.folder_name}
                            </NavLink>
                        )
                    })}
                </div>
            </div>
        )
    }

}

Sidebar.propTypes = {
    value: PropTypes.string
}

export default Sidebar