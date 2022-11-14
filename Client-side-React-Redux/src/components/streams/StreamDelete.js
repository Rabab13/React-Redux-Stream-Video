import React from "react";
import Modal from "../Modal"
import {connect} from "react-redux";
import {fetchStream, deleteStream} from '../../actions'
import history from "../../history"


// A portal allows us to render some element, not as a direct child.
// We can instead render that element or that component as a child of some other element inside of our HTML structure, most commonly the body.


class StreamDelete extends React.Component {

    //fetch stream with id to delete
    componentDidMount() {
        this.props.fetchStream(this.props.match.params.id);
    }
    
    renderActions() {
        const {id} = this.props.match.params;
        return (
            <React.Fragment>
                <button onClick={()=>this.props.deleteStream(id)} className="ui negative basic button">Delete</button>
                <button className="ui blue basic button">Cancel</button>
            </React.Fragment>
        )
    }
    renderContent() {
        if (!this.props.stream){
            return "Are you sure you want to delete this stream?"
        }
            return `Are you sure you want to delete this stream with title:! ${this.props.stream.title}`
        
    }
    render() {
        return (
            <div>
                <Modal
                title="Delete Stream"
                content={this.renderContent()}
                actions={this.renderActions()}
                onDismiss={() => history.push('/')}/>
            </div>
        )
    }
}

const mapStateToProps = (state, ownProps) =>{
    console.log(ownProps)
    return {stream:state.streams[ownProps.match.params.id] }
}

export default connect(mapStateToProps, {fetchStream, deleteStream})(StreamDelete);