import React from 'react'
import "./App.css";
import {BrowserRouter as Router, Route} from "react-router-dom";
import FetchCards from "./FetchCards";
import Login from "./Login";
import Register from "./Register";
import {AuthProvider} from "../Auth"
import PrivateRoute from "../PrivateRoute"
import Matches from "./Matches"


import Edit from './Edit'



const App = () => {
return (
    
   <AuthProvider>
  <Router>
      <div>
        <PrivateRoute exact path = "/" component = {FetchCards} />
        <Route exact path = "/register" component = {Register} />
        <Route exact path  = "/login" component = {Login} />
        <PrivateRoute exact path = "/matches" component = {Matches}/>
        
        <PrivateRoute exact path = "/edit" component = {Edit}/>
      </div>
  </Router>   
  </AuthProvider>

)
};

export default App;
