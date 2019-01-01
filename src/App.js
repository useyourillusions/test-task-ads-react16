import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import { getUserData } from './actions/AuthAction';

import HomeComponent from './components/HomeComponent/HomeComponent';
import HeaderComponent from './components/HeaderComponent/HeaderComponent';
import SingleAdComponent from './components/SingleAdComponent/SingleAdComponent';
import RegisterComponent from './components/RegisterComponent/RegisterComponent';
import AuthComponent from './components/AuthComponent/AuthComponent';
import NewAdComponent from './components/NewAdComponent/NewAdComponent';

import logo from './logo.svg';
import './App.css';


const Error = () => (
        <div>
            <p>Error</p>
        </div>
    );

const ProtectedRoute = ({component: Component, userData}) => (
    <Route render={
        props => (
            userData.isLoggedIn
            ? <Component {...props} />
            : <Redirect to={{ pathname: '/sign-in', state: { from: props.location }}} />
       )}
    />
);

class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isWaitingForLogin: true
        }
    }

    componentDidMount() {
        const token = localStorage.getItem('token');

        token && !this.props.userData.isLoggedIn
            ? this.props.getUserData()
            : this.setState({isWaitingForLogin: false});
    }

    componentDidUpdate(prevProps) {
        if (
            this.state.isWaitingForLogin &&
            prevProps.userData !== this.props.userData
        ) {
            this.setState({isWaitingForLogin: false});
        }
    }

    render() {
        return (
            this.state.isWaitingForLogin
                ? null
                : <Router>
                    <Fragment>
                        <HeaderComponent/>
                        <Switch>
                            <Route path="/" component={HomeComponent} exact />
                            <Route path="/ad/:ad" component={SingleAdComponent} />
                            <Route path="/register" component={RegisterComponent} />
                            <Route path="/sign-in" component={AuthComponent} />
                            <ProtectedRoute path="/new-ad"
                                            userData={this.props.userData}
                                            component={NewAdComponent}
                            />
                            <Route component={Error}/>
                        </Switch>
                    </Fragment>
                </Router>
        );
    }
}

const mapStateToProps = ({userData}) => ({userData});
const mapDispatchToProps = dispatch => ({
    getUserData: () => dispatch(getUserData())
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
