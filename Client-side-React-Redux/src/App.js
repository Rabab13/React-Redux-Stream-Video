import React from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import StreamCreate from './components/streams/StreamCreate'
import StreamList from './components/streams/StreamList'
import StreamShow from './components/streams/StreamShow'
import StreamEdit from './components/streams/StreamEdit'
import StreamDelete from './components/streams/StreamDelete'
import Header from './components/Header'
import history from './history'
import './style/App.css'


class App extends React.Component {


  render() {

    return(
      <div className="ui container">
        
          <Router history={history}>
          <div>
            {/* fix error link outside router */}
          <Header/>
          <Switch>
            <Route path='/' exact component={StreamList}/>
            <Route path='/streams/Add' component={StreamCreate}/>
            <Route path='/streams/remove/:id' component={StreamDelete}/>
            <Route path='/streams/:id' component={StreamShow}/>
            {/* params is :id and we can call it anything else */}
            <Route path='/streams/update/:id'  component={StreamEdit}/>
          </Switch>
          </div>
          </Router>
        </div>

    )
    
}
}




export default App;
