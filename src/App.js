import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';

import HomeComponent from './components/HomeComponent/HomeComponent';
import HeaderComponent from './components/HeaderComponent/HeaderComponent';
import SingleAdComponent from './components/SingleAdComponent/SingleAdComponent';
import RegisterComponent from './components/RegisterComponent/RegisterComponent';
import authComponent from './components/AuthComponent/AuthComponent';

//STATELESS
const Error = () => {
    return (
        <div>
            <p>Error</p>
        </div>
    )
};

class App extends Component {
    state = {
        isLoggedIn: true
    };

    render() {
        return (
            <Router>
                <div>
                    <HeaderComponent/>
                    <Switch>
                        <Route path="/" component={HomeComponent} exact />
                        <Route path="/ad/:ad" component={SingleAdComponent} />
                        <Route path="/register" component={RegisterComponent} />
                        <Route path="/sign-in" component={authComponent} />
                        <Route path="/test" render={
                            () => this.state.isLoggedIn ? (<div>Test Component</div>) : (<Redirect to='/' />)
                        } />
                        <Route component={Error}/>
                    </Switch>
                </div>
            </Router>
        );
    }
}

export default App;
