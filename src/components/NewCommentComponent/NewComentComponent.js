import React, { Component } from 'react';
import { connect } from 'react-redux';
import { postComment } from '../../actions/CommentsAction';

class NewCommentComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            newComment: ''
        };

        this.sendComment = this.sendComment.bind(this);
        this.onWriteComment = this.onWriteComment.bind(this);
    }

    componentDidUpdate(prevProps) {
        if (prevProps.comments.data.length !== this.props.comments.data.length) {
            this.setState({
                newComment: ''
            });
        }
    }

    sendComment(e) {
        e.preventDefault();
        const comment = {
            text: this.state.newComment,
            user: {
                name: 'Me',
                img: 'https://dummyimage.com/300x300/000/ff7800.png'
            }
        };

        this.props.postComment(comment);
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
                      onSubmit={this.sendComment}>
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

const mapStateToProps = ({comments, userData}) => ({comments, userData});
const mapDispatchToProps = (dispatch) => ({
    postComment: (comment) => dispatch(postComment(comment))
});


export default connect(mapStateToProps, mapDispatchToProps)(NewCommentComponent);
