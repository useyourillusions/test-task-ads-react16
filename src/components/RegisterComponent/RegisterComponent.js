import React, { Component } from 'react';
import axios from 'axios';
import errorHandler from '../../helpers/httpErrorHandler';
import env from '../../environment';
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

        this.registerUser = this.registerUser.bind(this);
        this.onFillInput = this.onFillInput.bind(this);
    }

    componentDidMount() {
        console.log('RegisterComponent Mounted', this.props);
    }

    registerUser(e) {
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

        axios
            .post(
                `${env.api.uri}:${env.api.port}/${env.api.registerRoute}`,
                dataToSend
            )
            .then(
                res => {
                    const data = res.data;

                    if (data.code === 200) {
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
                    }
                }
            )
            .catch(err => {
                errorHandler(err);
                this.setState({isFormSending: false});
            });
    }

    onFillInput(e) {
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
                          onSubmit={this.registerUser}
                          noValidate>
                        <h4 className="f-default__title f-comment__title">Fill your data below:</h4>
                        <div className="f-default__row">
                            <input type="text"
                                   name="firstName"
                                   placeholder="First name"
                                   className="f-default__field"
                                   value={this.state.user.firstName}
                                   onChange={this.onFillInput} />
                        </div>
                        <div className="f-default__row">
                            <input type="text"
                                   name="lastName"
                                   placeholder="Last name"
                                   className="f-default__field"
                                   value={this.state.user.lastName}
                                   onChange={this.onFillInput} />
                        </div>
                        <div className="f-default__row">
                            <input type="email"
                                   name="email"
                                   placeholder="Email"
                                   className="f-default__field"
                                   value={this.state.user.email}
                                   onChange={this.onFillInput} />
                        </div>
                        <div className="f-default__row">
                            <input type="password"
                                   name="password"
                                   placeholder="Password"
                                   className="f-default__field"
                                   value={this.state.user.password}
                                   onChange={this.onFillInput} />
                        </div>
                        <div className="f-default__row">
                            <input type="password"
                                   name="passConf"
                                   placeholder="Password confirmation"
                                   className="f-default__field"
                                   value={this.state.user.passConf}
                                   onChange={this.onFillInput} />
                        </div>
                        <button type="submit"
                                className="f-default__btn"
                                disabled={this.state.isFormSending}>Register</button>
                    </form>
                </div>
            </section>
        )
    }
}

export default RegisterComponent;
