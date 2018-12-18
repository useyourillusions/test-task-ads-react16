import React, { Component } from 'react';
import { connect } from 'react-redux';
import { NavLink, withRouter } from 'react-router-dom';
import { authSuccess, authLogout } from '../../actions/AuthAction';
import http from '../../helpers/axiosCustomInstance';
import './HeaderComponent.css';

const LoggedStatus = ({props}) => {
    const { isLoggedIn, personalInfo } = props.userData;

    if (isLoggedIn) {
        return (
            <div className="header__user">
                <img className="header__user-img"
                     src={`${personalInfo.photo}`}
                     alt="" />
                <span className="header__user-name">{`${personalInfo.firstName} ${personalInfo.lastName}`}</span>
                <button type="button"
                        className="header__user-btn-logout"
                        onClick={props.logout}>Logout</button>
            </div>
        )
    }

    return (
        <div className="header__nav-auth-links">
            <NavLink to="/register" className="header__nav-link" activeclass="active">Register</NavLink>
            <NavLink to="/sign-in" className="header__nav-link" activeclass="active">Sign in</NavLink>
        </div>
    )
};

class HeaderComponent extends Component {

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
                    localStorage.removeItem('token');
                }
            )
    }

    render() {
        return (
            <header className="header" onClick={this.props.test}>
                <div className="container">
                    <nav className="header__nav">
                        <NavLink to="/" className="header__nav-link" activeclass="active" exact>Home</NavLink>
                        <LoggedStatus props={this.props}/>
                    </nav>
                </div>
            </header>
        )
    }
}

const mapStateToProps = ({userData}) => ({userData});
const mapDispatchToProps = dispatch => ({
    applyUserData: data => dispatch(authSuccess(data)),
    logout: data => dispatch(authLogout(data))
});

export default withRouter(
    connect(mapStateToProps, mapDispatchToProps)(HeaderComponent)
);
