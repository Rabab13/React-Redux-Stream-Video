import React from "react";
import {connect} from "react-redux";
import {Link} from "react-router-dom"
import {fetchStreams} from '../../actions'


class StreamList extends React.Component {
    componentDidMount(){
        this.props.fetchStreams();
}
//create Admin
renderAdmin(stream){
    if(stream.userId === this.props.currentUserId){
        return(
            <div className="right floated content">
                <Link to={`/streams/update/${stream.id}`} className="ui button primary">EDIT</Link>
                <Link to={`/streams/remove/${stream.id}`} className="ui button negative">DELETE</Link>
            </div>
            )
    }
}
renderList(){
    return this.props.streams.map(stream =>{
        return (
        <div className="item" key={stream.id}>
            <i className="large middle aligned icon camera"/>
            <h3 className="header">
                <Link to={`/streams/${stream.id}`} >{stream.title}</Link>
                </h3>
            <div className="description">{stream.description}</div>
            <div>{this.renderAdmin(stream)}</div>
        </div>
        )

    })
}
renderCreateStream() {
    if (this.props.isSignedIn){
        return (
            <div style={{textAlign:'right'}}>
                <Link to='/streams/add' className="ui button primary">
                Create Stream
                </Link>
            </div>
        )
    }
}
render() {
    return (
        <div>
            <h2>Streams</h2>
            <div className="ui celled list">{this.renderList()}</div>
            {this.renderCreateStream()}
        </div>
    )
}
}

const mapStateToProps = state=>{
    return {
        streams: Object.values(state.streams),
        currentUserId: state.auth.userId,
        isSignedIn:state.auth.isSignedIn
    }
}
export default connect(mapStateToProps, {fetchStreams})(StreamList);