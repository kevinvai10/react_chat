import React from 'react';
//import {connect} from 'react-redux'
import {BrowserRouter as Router, Route, Redirect} from 'react-router-dom';
import './App.css';
import Register from './components/register/Register';
import Signin from './components/signin/Signin';
import Chatcontainer from './components/chatcontainer/Chatcontainer';

/*const mapStateToProps = state => {
  return {
      isLoggedIn: state.loginStatus,
      user: state.user,
  }
}*/
class App extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      isLoggedIn: false,
      user: {}
    }
  }

  signin = (user) => {
    this.setState({user: user, isLoggedIn: true})
  }

  render(){
    const {isLoggedIn, user} = this.state;
    return (
      <div className="App">
        <h1>hello</h1>
        <Router>
            <Route exact path="/" render={(props) => <Chatcontainer {...props} user={user} />}/>
            <Route exact path="/signin"  render={(props) => <Signin {...props} login={this.signin} />}/>  
            <Route exact path= "/register" component={Register}/>
            {isLoggedIn 
              ? <Redirect from="/signin" exact to="/"/> 
              : <Redirect from="/" exact to="/signin"/>
            }    
            </Router>
      </div>
    );
  }
}

//export default connect(mapStateToProps)(App);
export default App;