import React from "react";
import Users from "./users";
import { Route, Switch } from "react-router-dom"
import NavBar from "./navBar"; 
import Main from "./Main";
import Login from "./login";
import Test from "./test";



function App() {

    return (
    <>  
        <NavBar/>
        <Switch>
        <Route path="/" exact component={Main}/>
        <Route path="/login" component={Login}/>
        <Route path="/users/:postId?" component={Test}/>
        </Switch>    
        
    </>)
}
export default App;
