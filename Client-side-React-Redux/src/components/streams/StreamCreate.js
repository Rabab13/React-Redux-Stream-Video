import React from "react";
import {connect} from 'react-redux';
import {createStream} from '../../actions/index'
import StreamForm from './StreamForm'

class StreamCreate extends React.Component {

    onSubmit = (formValue) => {
        this.props.createStream(formValue)
        // console.log(formValue);
        
    }

    render() {
        console.log(this.props)
        return (
            <div>
                <h1>Create a Stream</h1>
                <StreamForm onSubmit={this.onSubmit}/>
            </div>
        )
    }
    
}

//reduxForm() will return the function which created by streamCreate
export default connect(null, {createStream})(StreamCreate);