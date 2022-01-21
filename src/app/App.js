import React from "react";
import { Route, Switch } from "react-router-dom"
import NavBar from "./components/UI/navBar"; 
import Main from "./layout/main";
import Login from "./layout/login";
import Users from './layout/users'
import ChangeForm from "./components/UI/changeForm";



function App() {

    return (
    <>  
        <NavBar/>
        <Switch>
        <Route path="/users/:postId/edit" component={ChangeForm}/>
        <Route path="/" exact component={Main}/>
        <Route path="/login/:type?" component={Login}/>
        <Route path="/users/:postId?" component={Users}/>
        
        </Switch>    
        
    </>)
}
export default App;
