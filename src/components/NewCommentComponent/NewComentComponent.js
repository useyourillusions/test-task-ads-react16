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
        this.onWriteComment = this.onWriteComment.bind(this);
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

    onWriteComment(e) {
        this.setState({
            newComment: e.target.value
        });
    }

    render() {
        if (this.props.userData.isLoggedIn) {
            return (
                <form action="#"
                      className={`f-default f-comment ${this.props.comments.isSending ? '_sending' : ''}`}
                      onSubmit={this.onSendComment}>
                    <h4 className="f-default__title f-comment__title">Write a new comment</h4>
                    <textarea name="comment"
                              className="f-comment__area"
                              value={this.state.newComment}
                              onChange={this.onWriteComment}
                              rows="10" />
                    <button type="submit"
                            className="f-default__btn f-comment__btn"
                            disabled={this.props.comments.isSending}>Send</button>
                </form>
            )
        }

        return '';
    }
}

const mapStateToProps = ({userData, comments}) => ({userData, comments});
const mapDispatchToProps = dispatch => ({
    sendComment: comment => dispatch(sendComment(comment))
});


export default connect(mapStateToProps, mapDispatchToProps)(NewCommentComponent);
