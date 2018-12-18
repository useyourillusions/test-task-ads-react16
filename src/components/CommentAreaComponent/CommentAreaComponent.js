import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { updateComment, removeComment } from '../../actions/CommentsAction';
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

    componentDidUpdate(prevProps, prevState) {
        if (
            this.props.comments !== prevProps.comments &&
            prevState.editedComment &&
            prevState.editedComment === this.state.editedComment
        ) {
            this.setState({
                isEditable: !this.state.isEditable,
                editedComment: ''
            });
        }
    }

    toggleTextAreaVisibility() {
        this.setState({
            isEditable: !this.state.isEditable
        });
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
        if (this.state.editedComment && this.state.editedComment !== this.props.currentComment.text) {
            this.props.updateComment(
                {
                    id: this.props.currentComment._id,
                    text: this.state.editedComment
                }
            );

        } else {
            this.toggleTextAreaVisibility();
        }
    }

    getFormattedDate() {
        const postedDate = new Date(this.props.currentComment.created);
        const addZero = number => {
            const string = number + '';
            return string.length > 1 ? number : 0 + string;
        };
        const formattedPostedDate =
            `Posted: ${addZero(postedDate.getDay())}.${addZero(postedDate.getMonth() + 1)}.${postedDate.getFullYear()} 
            at ${addZero(postedDate.getHours())}:${addZero(postedDate.getMinutes())}`;

        return formattedPostedDate;
    }

    render() {
        const isThatMyComment = this.props.userData.isLoggedIn &&
            this.props.currentComment.author.email === this.props.userData.personalInfo.email;

        if (this.state.isEditable) {
            return (
                <div className="b-comment-area">
                    <div className="b-comment-area__actions">
                        <span className="b-comment-area__actions-posted">
                            {this.getFormattedDate()}
                        </span>
                        <div>
                            <button
                                type="button"
                                className="b-comment-area__actions-btn"
                                onClick={this.toggleTextAreaVisibility}>Cancel</button>
                        </div>
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
                {
                    isThatMyComment
                        ?
                        <div className="b-comment-area__actions">
                            <span className="b-comment-area__actions-posted">
                                {this.getFormattedDate()}
                            </span>
                            <div>
                                <button
                                    type="button"
                                    className="b-comment-area__actions-btn"
                                    onClick={this.toggleTextAreaVisibility}>Edit</button>
                                <button
                                    type="button"
                                    className="b-comment-area__actions-btn"
                                    onClick={this.removeComment}>Remove</button>
                            </div>
                        </div>
                        :
                        <div className="b-comment-area__actions">
                            <span className="b-comment-area__actions-posted">
                                {this.getFormattedDate()}
                            </span>
                        </div>
                }
                <div className="b-comment-area__text">{this.props.currentComment.text}</div>
            </div>
        )
    }
}

const mapStateToProps = ({comments, userData}) => ({comments, userData});
const mapDispatchToProps = dispatch => ({
    updateComment: data => dispatch(updateComment(data)),
    removeComment: id => dispatch(removeComment(id))
});

CommentAreaComponent.propTtypes = {
    isLoading: PropTypes.bool,
    data: PropTypes.array
};

export default connect(mapStateToProps, mapDispatchToProps)(CommentAreaComponent);
