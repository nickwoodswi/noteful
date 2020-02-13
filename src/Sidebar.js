import React, {Component} from 'react'
import './Sidebar.css'
import { NavLink } from 'react-router-dom'
import './Sidebar.css'

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
                                    {folder.name}
                            </NavLink>
                        )
                    })}
                </div>
            </div>
        )
    }

}

export default Sidebar