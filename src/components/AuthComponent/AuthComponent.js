import React, { Component } from 'react';
import { connect } from 'react-redux';
import { proceedSignIn } from '../../actions/AuthAction';
import { Redirect } from 'react-router-dom';
import './AuthComponent.css';


class AuthComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userData: {
                email: '',
                password: ''
            },
        };

        this.signInUser = this.signInUser.bind(this);
        this.onFillInput = this.onFillInput.bind(this);
        this.redirectIfSuccess = () => this.props.userData.isLoggedIn
            ? <Redirect to="/" />
            : null;
    }

    componentDidUpdate(prevProps) {
        if (
            prevProps.userData.isLoggedIn !== this.props.userData.isLoggedIn &&
            prevProps.userData.isSignInOnProcess !== this.props.userData.isSignInOnProcess
        ) {
            this.setState({
                userData: {
                    email: '',
                    password: ''
                }
            });
        }
    }

    signInUser(e) {
        e.preventDefault();

        if (!this.state.userData.password || !this.state.userData.email) {
            alert('Fields shouldn\'t be empty!');
            return;
        }

        this.props.proceedSignIn(this.state.userData);
    }

    onFillInput(e) {
        this.setState({
            userData: {
                ...this.state.userData,
                [e.target.name]: e.target.value
            }
        });
    }

    render() {
        return (
            <section className="s-auth">
                {this.redirectIfSuccess()}
                <div className="container">
                    <form action="#"
                          className={`f-default f-auth${this.props.userData.isSignInOnProcess ? ' _sending' : ''}`}
                          onSubmit={this.signInUser}
                          noValidate>
                        <div className="f-default__row">
                            <input type="email"
                                   name="email"
                                   placeholder="Email"
                                   className="f-default__field"
                                   value={this.state.userData.email}
                                   onChange={this.onFillInput} />
                        </div>
                        <div className="f-default__row">
                            <input type="password"
                                   name="password"
                                   placeholder="Password"
                                   className="f-default__field"
                                   value={this.state.userData.password}
                                   onChange={this.onFillInput} />
                        </div>
                        <button type="submit"
                                className="f-default__btn"
                                disabled={this.props.userData.isSignInOnProcess}>Sign In</button>
                    </form>
                </div>
            </section>
        )
    }
}

const mapStateToProps = ({userData, redirect}) => ({userData, redirect});
const mapDispatchToProps = dispatch => ({
    proceedSignIn: data => dispatch(proceedSignIn(data))
});

export default connect(mapStateToProps, mapDispatchToProps)(AuthComponent);
