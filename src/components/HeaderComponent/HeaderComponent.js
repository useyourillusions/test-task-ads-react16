import React, { Component } from 'react';
import { connect } from 'react-redux';
import { NavLink, withRouter } from 'react-router-dom';
import { proceedLogout } from '../../actions/AuthAction';
import './HeaderComponent.css';

const LoggedStatus = ({ userData, logout }) => {
    const { isLoggedIn, personalInfo } = userData;

    if (isLoggedIn) {
        return (
            <div className="header__user">
                <img className="header__user-img"
                     src={`${personalInfo.photo}`}
                     alt="" />
                <span className="header__user-name">
                    {`${personalInfo.firstName} ${personalInfo.lastName}`}
                </span>
                <button type="button"
                        className="header__user-btn-logout"
                        onClick={logout}>
                    Logout
                </button>
            </div>
        )
    }

    return (
        <div className="header__nav-auth-links">
            <NavLink to="/register"
                     className="header__nav-link"
                     activeclass="active">
                Register
            </NavLink>
            <NavLink to="/sign-in"
                     className="header__nav-link"
                     activeclass="active">
                Sign in
            </NavLink>
        </div>
    )
};

class HeaderComponent extends Component {
    render() {
        return (
            <header className="header">
                <div className="container">
                    <nav className="header__nav">
                        <div className="header__nav-links">
                            <NavLink to="/"
                                     className="header__nav-link"
                                     activeclass="active"
                                     exact>
                                Home
                            </NavLink>
                            {
                                this.props.userData.isLoggedIn
                                    ? <NavLink to="/new-ad"
                                               className="header__nav-link"
                                               activeclass="active">
                                        Post a new advertisement
                                    </NavLink>
                                    : null
                            }
                        </div>
                        <LoggedStatus userData={this.props.userData}
                                      logout={this.props.logout} />
                    </nav>
                </div>
            </header>
        )
    }
}

const mapStateToProps = ({userData}) => ({userData});
const mapDispatchToProps = dispatch => ({
    logout: () => dispatch(proceedLogout())
});

export default withRouter(
    connect(mapStateToProps, mapDispatchToProps)(HeaderComponent)
);
