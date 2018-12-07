import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getComments } from '../../actions/CommentsAction';
import NewCommentComponent from './NewCommentComponent/NewComentComponent'
import './CommentsComponent.css';


const CommentsList = ({props}) => {
    if (props.isLoading) {
        return <h3 style={{textAlign: 'center'}}>Loading...</h3>;
    }

    return (
        <ul className="l-comments">
            {
                props.data.map((comment, i) => (
                    <li className="l-comments__item" key={i}>
                        <div className="l-comments__user">
                            <img src={comment.user.img} className="l-comments__user-img" alt=""/>
                            <span className="l-comments__user-name">{comment.user.name}</span>
                        </div>
                        <div className="l-comments__text">{comment.text}</div>
                    </li>
                ))
            }
        </ul>
    );
};


class CommentsComponent extends Component {
    componentDidMount() {
        console.log('CommentsComponent Mounted', this.props);
        this.props.getComments();
    }

    render() {
        return (
            <section className="s-comments">
                <div className="container">
                    <NewCommentComponent/>
                    <h4 className="s-comments__title">Comments:</h4>
                    <CommentsList props={this.props.comments} />
                </div>
            </section>
        )
    }
}

const mapStateToProps = ({comments}) => ({comments});
const mapDispatchToProps = (dispatch) => ({
    getComments: () => dispatch(getComments()),
});

CommentsComponent.propTtypes = {
    isLoading: PropTypes.bool,
    data: PropTypes.array
};

export default connect(mapStateToProps, mapDispatchToProps)(CommentsComponent);
