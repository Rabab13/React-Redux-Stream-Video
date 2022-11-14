import _ from 'lodash';
import React from "react";
import {connect} from "react-redux";
import {fetchStreams, updateStream} from '../../actions'
import StreamForm from './StreamForm'

class StreamEdit extends React.Component {
    //Each component needs to fetch it data isolate so we will call componentDidMount to fetch streams here again 
    componentDidMount() {
        this.props.fetchStreams(this.props.match.params.id);
    }

    onSubmit = (formValue) => {
        this.props.updateStream(this.props.match.params.id, formValue)
    }
    render() {
        if(!this.props.stream)  
            return <div>Loading...</div>
        return (
            <div>
                <h2>Edit Stream!</h2>
                <StreamForm 
                //initialValues is rendering text inside the input or the original stream to edit
                //initialValues={{title:'Edit Me', description:'Change me too'}}
                initialValues={_.pick(this.props.stream, 'title', 'description')}
                onSubmit={this.onSubmit}/>
            </div>
        )
    }
    
}

const mapStateToProps = (state, ownProps) =>{
    console.log(ownProps)
    return {stream:state.streams[ownProps.match.params.id] }
}

export default connect(mapStateToProps, {fetchStreams, updateStream})(StreamEdit);