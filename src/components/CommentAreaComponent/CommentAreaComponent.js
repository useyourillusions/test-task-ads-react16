import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { updateComment, removeComment } from "../../actions/CommentsAction";
import './CommentAreaComponent.css';

class CommentAreaComponent extends Component {
    constructor(props) {
        super(props);

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
        this.setState({
            editedComment: this.props.currentComment.text
        })
    }

    toggleTextAreaVisibility() {
        this.setState({
            isEditable: !this.state.isEditable
        })
    }

    removeComment() {
        this.props.removeComment(this.props.currentComment._id);
    }

    onCommentEdit(e) {
        this.setState({
            editedComment: e.target.value
        });
    }

    saveEdited() {
        if (this.props.currentComment.text !== this.state.editedComment) {
            this.props.updateComment(
                {
                    id: this.props.currentComment._id,
                    text: this.state.editedComment
                },
                this.toggleTextAreaVisibility
            );

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
                        defaultValue={this.props.currentComment.text} />
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
                <div className="b-comment-area__text">{this.props.currentComment.text}</div>
            </div>
        )
    }
}

const mapStateToProps = ({comments}) => ({comments});
const mapDispatchToProps = dispatch => ({
    updateComment: (data, cb) => dispatch(updateComment(data, cb)),
    removeComment: id => dispatch(removeComment(id))
});

CommentAreaComponent.propTtypes = {
    isLoading: PropTypes.bool,
    data: PropTypes.array
};

export default connect(mapStateToProps, mapDispatchToProps)(CommentAreaComponent);
