import React, {Component} from 'react';
import NavBar from './components/layout/NavBar';
import Landing from './components/layout/Landing';
import Footer from './components/layout/Footer';
import Register from './components/auth/Register';
import Login from './components/auth/Login'
import './App.css';
import {BrowserRouter as Router, Route} from "react-router-dom";


class App extends Component{
  render(){
    return(
      <Router>
        <div className="App">
          <NavBar />
          <Route exact path= "/" component= {Landing} />
          <Route exact path= "/register" component={Register} />
          <Route exact path= "/login" component={Login} />
          <Footer />
        </div>
      </Router>
    )
  }
}

export default App;
