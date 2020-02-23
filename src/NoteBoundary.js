import React, {Component} from 'react'

class NoteBoundary extends Component {

    constructor(props) {
        super()
        this.state = {
            hasError: false
        }
    }

    static getDerivedStateFromError(error) {
        return { hasError: true };
    }

    render() {
        if (this.state.hasError) {
            return (
                <h2>Could not add note.</h2>
            );
        }
        return this.props.children
    }

}

export default NoteBoundary