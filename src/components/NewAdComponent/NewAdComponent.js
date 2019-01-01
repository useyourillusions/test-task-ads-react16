import React, { Component } from 'react';
import http from '../../helpers/axiosCustomInstance';
import errorHandler from '../../helpers/httpErrorHandler';
import './NewAdComponent.css'


class NewAdComponent extends Component {
    constructor(props){
        super(props);

        this.state = {
            title: '',
            text: '',
            isSending: false,
            isSent: false
        };
        this.onInput = this.onInput.bind(this);
        this.onPostNewAd = this.onPostNewAd.bind(this);
        this.postAnother = this.postAnother.bind(this);
    }

    onPostNewAd(e) {
        e.preventDefault();

        if (!this.state.title || !this.state.text) {
            return alert('Fields shouldn\'t be empty!');
        }
        const newAdvertisement = {
            title: this.state.title,
            text: this.state.text
        };

        this.setState({
           isSending: true
        });

        http.postNewAd(newAdvertisement)
            .then(
                res => {
                    console.log(res);
                    this.setState({
                        isSending: false,
                        isSent: true
                    });
                    alert(res.data.message);
                },
                err => {
                    console.log(err);
                    errorHandler(err).then(
                        res => {
                           if (res.code === 200) {
                               this.onPostNewAd(e);
                           } else {
                               this.setState({
                                   isSending: false
                               });
                           }
                        });
                }
            )
    }

    onInput(e) {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    postAnother() {
        this.setState({
            isSent: false
        })
    }

    render() {
        return (
            <section className="s-new-ad">
                <div className="container">
                    {
                        this.state.isSent
                            ? <div className="s-new-ad__inner">
                                <button type="button"
                                        className="btn-default"
                                        onClick={this.postAnother}>
                                    Post another one
                                </button>
                            </div>
                            : <form action=""
                                      className={`f-default f-advertisement${this.state.isSending ? ' _sending' : ''}`}
                                      onSubmit={this.onPostNewAd}
                                      noValidate
                                >
                                    <div className="f-advertisement__inner">
                                        <div className="f-advertisement__inner-col">
                                            <img src="https://dummyimage.com/600x400/000/00ffd5.png"
                                                 className="f-advertisement__img"
                                                 alt="" />
                                        </div>
                                        <div className="f-advertisement__inner-col">
                                            <label className="f-advertisement__label">Title (e.g. Продам гараж)</label>
                                            <div className="f-default__row f-advertisement__row">
                                                <input type="text"
                                                       name="title"
                                                       className="f-default__field"
                                                       value={this.state.title}
                                                       onChange={this.onInput} />
                                            </div>
                                            <label className="f-advertisement__label">Text (e.g. Lorem ipsum)</label>
                                            <textarea name="text"
                                                      className="f-comment__area"
                                                      rows="10"
                                                      value={this.state.text}
                                                      onChange={this.onInput} />
                                            <button type="submit"
                                                    className="btn-default f-comment__btn"
                                                    disabled="">
                                                Create new add
                                            </button>
                                        </div>
                                    </div>
                                </form>
                    }
                </div>
            </section>
        )
    }
}

export default NewAdComponent;
