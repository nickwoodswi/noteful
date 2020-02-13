import React, {Component} from 'react'
import Context from './Context'
import {Link} from 'react-router-dom'

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
            <Context.Consumer>
                {value => {
                    
                    return(
                        <Link to='/'>
                        <button type="button" onClick={() => this.deleteNote(this.props.id)}>DELETE</button>
                        </Link>
                    )
                }}
            </Context.Consumer>
        )
    }
}

export default DeleteButton