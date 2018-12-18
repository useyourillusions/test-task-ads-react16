import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import HomeComponent from './components/HomeComponent/HomeComponent';
import HeaderComponent from './components/HeaderComponent/HeaderComponent';
import SingleAdComponent from './components/SingleAdComponent/SingleAdComponent';
import RegisterComponent from './components/RegisterComponent/RegisterComponent';
import AuthComponent from './components/AuthComponent/AuthComponent';

//STATELESS
const Error = () => {
    return (
        <div>
            <p>Error</p>
        </div>
    )
};

class App extends Component {
    render() {
        return (
            <Router>
                <div>
                    <HeaderComponent/>
                    <Switch>
                        <Route path="/" component={HomeComponent} exact />
                        <Route path="/ad/:ad" component={SingleAdComponent} />
                        <Route path="/register" component={RegisterComponent} />
                        <Route path="/sign-in" component={AuthComponent} />
                        <Route component={Error}/>
                    </Switch>
                </div>
            </Router>
        );
    }
}

export default App;
