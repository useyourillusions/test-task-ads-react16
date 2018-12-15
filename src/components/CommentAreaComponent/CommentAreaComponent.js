import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import './CommentAreaComponent.css';
import { saveEdited, removeComment } from "../../actions/CommentsAction";


class CommentAreaComponent extends Component {
    constructor() {
        super();

        this.state = {
            isEditable: false,
            editedComment: ''
        };

        this.toggleTextAreaVisibility = this.toggleTextAreaVisibility.bind(this);
        this.removeComment = this.removeComment.bind(this);
        this.saveEdited = this.saveEdited.bind(this);
        this.onCommentEdit = this.onCommentEdit.bind(this);
    }

    componentDidMount() {
        console.log(789, this.props);

        this.setState({
            editedComment: this.props.comment.text
        })
    }

    toggleTextAreaVisibility() {
        this.setState({
            isEditable: !this.state.isEditable
        })
    }

    removeComment() {
        this.props.removeComment(this.props.comment._id);
    }

    onCommentEdit(e) {
        this.setState({
            editedComment: e.target.value
        });
    }

    saveEdited() {
        if (this.props.comment.text !== this.state.editedComment) {
            this.props.saveEdited({
                id: this.props.comment._id,
                text: this.state.editedComment
            });

        } else {
            this.toggleTextAreaVisibility();
        }
    }

    render() {
        if (this.state.isEditable) {

            return (
                <div className="b-comment-area">
                    <div className="b-comment-area__actions">
                        <button
                            type="button"
                            className="b-comment-area__actions-btn"
                            onClick={this.toggleTextAreaVisibility}>Cancel</button>
                    </div>
                    <textarea
                        className="b-comment-area__textarea"
                        onChange={this.onCommentEdit}
                        defaultValue={this.props.comment.text} />
                    <button
                        type="button"
                        className="b-comment-area__btn-save"
                        onClick={this.saveEdited}>Save</button>
                </div>
            )
        }

        return (
            <div className="b-comment-area">
                <div className="b-comment-area__actions">
                    <button
                        type="button"
                        className="b-comment-area__actions-btn"
                        onClick={this.toggleTextAreaVisibility}>Edit</button>
                    <button
                        type="button"
                        className="b-comment-area__actions-btn"
                        onClick={this.removeComment}>Remove</button>
                </div>
                <div className="b-comment-area__text">{this.props.comment.text}</div>
            </div>
        )
    }
}

const mapStateToProps = ({comments}) => ({comments});
const mapDispatchToProps = dispatch => ({
    saveEdited: data => dispatch(saveEdited(data)),
    removeComment: id => dispatch(removeComment(id))
});

CommentAreaComponent.propTtypes = {
    isLoading: PropTypes.bool,
    data: PropTypes.array
};

export default connect(mapStateToProps, mapDispatchToProps)(CommentAreaComponent);
