import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { authSuccess, proceedLogout } from './actions/AuthAction';
import http from './helpers/axiosCustomInstance';
import errorHandler from './helpers/httpErrorHandler';

import HomeComponent from './components/HomeComponent/HomeComponent';
import HeaderComponent from './components/HeaderComponent/HeaderComponent';
import SingleAdComponent from './components/SingleAdComponent/SingleAdComponent';
import RegisterComponent from './components/RegisterComponent/RegisterComponent';
import AuthComponent from './components/AuthComponent/AuthComponent';

import logo from './logo.svg';
import './App.css';


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
        http.getUserData().then(
            res => {
                console.log(res);
                this.props.applyUserData(res.data.content);
            },
            err => {
                errorHandler(err).then(
                    res => {
                        console.log(res);

                        if (res.code === 200) {
                            this.getUserData()
                        } else {
                            this.props.logout();
                        }
                    }
                );
            }
        )
    }

    render() {
        return (
            <Router>
                <Fragment>
                    <HeaderComponent/>
                    <Switch>
                        <Route path="/" component={HomeComponent} exact />
                        <Route path="/ad/:ad" component={SingleAdComponent} />
                        <Route path="/register" component={RegisterComponent} />
                        <Route path="/sign-in" component={AuthComponent} />
                        <Route component={Error}/>
                    </Switch>
                </Fragment>
            </Router>
        );
    }
}

const mapStateToProps = ({userData}) => ({userData});
const mapDispatchToProps = dispatch => ({
    applyUserData: data => dispatch(authSuccess(data)),
    logout: () => dispatch(proceedLogout())
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
