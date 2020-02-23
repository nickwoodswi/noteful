import React, {Component} from 'react'

class FolderBoundary extends Component {

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
                <h2>Could not add folder.</h2>
            );
        }
        return this.props.children
    }

}

export default FolderBoundary