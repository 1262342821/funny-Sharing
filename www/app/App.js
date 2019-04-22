import React from "react";
import {connect} from "dva";
import style from "./style/less.less";
import {HashRouter as Router,Route,Link} from "react-router-dom";
export default class App extends React.Component{
    constructor(){
        super();
    }

    render(){
        return <div className="albumWraper">
            <Router>
        <div>
            <ul>
                <li><Link to="/mian">首页</Link></li>
            </ul>
            <Route exact path="/mian" component={App}></Route>
            </div>
        </Router></div>
    }
}

