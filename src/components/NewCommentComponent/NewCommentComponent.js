import React, { Component } from 'react';
import { connect } from 'react-redux';
import { sendComment } from '../../actions/CommentsAction';

class NewCommentComponent extends Component {
    constructor(props) {
        super(props);

        this.state = {
            newComment: ''
        };
        this.onSendComment = this.onSendComment.bind(this);
        this.onInput = this.onInput.bind(this);
    }

    componentDidUpdate(prevProps) {
        if (prevProps.comments.data.length !== this.props.comments.data.length) {
            this.setState({
                newComment: ''
            });
        }
    }

    onSendComment(e) {
        e.preventDefault();
        const comment = {
            text: this.state.newComment,
            adId: this.props.adId
        };

        this.props.sendComment(comment);
    }

    onInput(e) {
        this.setState({
            newComment: e.target.value
        });
    }

    render() {
        return (
            this.props.userData.isLoggedIn
            ? <form action="#"
                  className={`f-default f-comment${this.props.commentsProcessing.isSending ? ' _sending' : ''}`}
                  onSubmit={this.onSendComment}>
                <h4 className="f-default__title f-comment__title">Write a new comment</h4>
                <textarea name="comment"
                          className="f-comment__area"
                          value={this.state.newComment}
                          onChange={this.onInput}
                          rows="10"/>
                <button type="submit"
                        className="btn-default f-comment__btn"
                        disabled={this.props.commentsProcessing.isSending}>
                    Send
                </button>
            </form>
            : null
        );
    }
}

const mapStateToProps = ({userData, comments, commentsProcessing}) => ({userData, comments, commentsProcessing});
const mapDispatchToProps = dispatch => ({
    sendComment: comment => dispatch(sendComment(comment))
});


export default connect(mapStateToProps, mapDispatchToProps)(NewCommentComponent);
