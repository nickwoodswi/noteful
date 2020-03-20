import React, {Component} from 'react'
import Context from './Context'
import {Link} from 'react-router-dom'
import PropTypes from 'prop-types'

class DeleteButton extends Component {

    static contextType = Context

    deleteNote(id) {
        fetch(`http://localhost:9090/notes/${id}`, {
            method: 'DELETE',
            headers: {
                'content-type': 'application/json'
            },
        })
            .then(() => {
                this.context.deleteNote(id)
            })
    }

    render() {
        return( 
            <Link to='/'>
                <div className="delete-button"><button type="button" onClick={() => this.deleteNote(this.props.id)}>DELETE</button></div>
            </Link>
        )
    }
}

DeleteButton.propTypes = {
    value: PropTypes.string
}

export default DeleteButton