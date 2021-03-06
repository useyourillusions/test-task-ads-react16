import React, { Component } from 'react';
import http from '../../helpers/axiosCustomInstance';
import errorHandler from '../../helpers/httpErrorHandler';
import './RegisterComponent.css';

class RegisterComponent extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isFormSending: false,
            user: {
                firstName: '',
                lastName: '',
                email: '',
                password: '',
                passConf: ''
            },
        };

        this.doRegistration = this.doRegistration.bind(this);
        this.onInput = this.onInput.bind(this);
    }

    doRegistration(e) {
        e.preventDefault();
        const {passConf, ...dataToSend} = this.state.user;

        if (
            !this.state.user.password.length ||
            this.state.user.password !== this.state.user.passConf
        ) {
            alert('Passwords don\'t match');
            return;
        }

        this.setState({
            isFormSending: true
        });

        http.register(dataToSend).then(
            () => {
                this.setState({
                    isFormSending: false,
                    user: {
                        firstName: '',
                        lastName: '',
                        email: '',
                        password: '',
                        passConf: ''
                    }
                });
                this.props.history.push(`/sign-in`);
            },
            err => {
                this.setState({isFormSending: false});
                errorHandler(err).then(res => console.log(res));
            }
        )
    }

    onInput(e) {
        this.setState({
            user: {
                ...this.state.user,
                [e.target.name]: e.target.value
            }
        });
    }

    render() {
        return (
            <section className="s-auth">
                <div className="container">
                    <form action="#"
                          className={`f-default f-auth ${this.state.isFormSending ? '_sending' : ''}`}
                          onSubmit={this.doRegistration}
                          noValidate>
                        <h4 className="f-default__title f-comment__title">Fill your data below:</h4>
                        <div className="f-default__row">
                            <input type="text"
                                   name="firstName"
                                   placeholder="First name"
                                   className="f-default__field"
                                   value={this.state.user.firstName}
                                   onChange={this.onInput}
                            />
                        </div>
                        <div className="f-default__row">
                            <input type="text"
                                   name="lastName"
                                   placeholder="Last name"
                                   className="f-default__field"
                                   value={this.state.user.lastName}
                                   onChange={this.onInput} />
                        </div>
                        <div className="f-default__row">
                            <input type="email"
                                   name="email"
                                   placeholder="Email"
                                   className="f-default__field"
                                   value={this.state.user.email}
                                   onChange={this.onInput} />
                        </div>
                        <div className="f-default__row">
                            <input type="password"
                                   name="password"
                                   placeholder="Password"
                                   className="f-default__field"
                                   value={this.state.user.password}
                                   onChange={this.onInput} />
                        </div>
                        <div className="f-default__row">
                            <input type="password"
                                   name="passConf"
                                   placeholder="Password confirmation"
                                   className="f-default__field"
                                   value={this.state.user.passConf}
                                   onChange={this.onInput} />
                        </div>
                        <button type="submit"
                                className="btn-default f-comment__btn"
                                disabled={this.state.isFormSending}>Register</button>
                    </form>
                </div>
            </section>
        )
    }
}

export default RegisterComponent;
