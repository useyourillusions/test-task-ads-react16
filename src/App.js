import React, {Component} from 'react';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { authSuccess, authLogout } from './actions/AuthAction';
import http from './helpers/axiosCustomInstance';

import HomeComponent from './components/HomeComponent/HomeComponent';
import HeaderComponent from './components/HeaderComponent/HeaderComponent';
import SingleAdComponent from './components/SingleAdComponent/SingleAdComponent';
import RegisterComponent from './components/RegisterComponent/RegisterComponent';
import AuthComponent from './components/AuthComponent/AuthComponent';

import logo from './logo.svg';
import './App.css';

//STATELESS
const Error = () => (
        <div>
            <p>Error</p>
        </div>
    );

class App extends Component {
    componentDidMount() {
        const token = localStorage.getItem('token');

        if (token && !this.props.userData.isLoggedIn) {
            this.getUserData();
        }
    }

    getUserData() {
        http
            .getUserData()
            .then(
                res => {
                    this.props.applyUserData(res.data.content);
                },
                err => {
                    console.log(err);
                }
            )
    }

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

const mapStateToProps = ({userData}) => ({userData});
const mapDispatchToProps = dispatch => ({
    applyUserData: data => dispatch(authSuccess(data)),
    logout: () => dispatch(authLogout())
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
