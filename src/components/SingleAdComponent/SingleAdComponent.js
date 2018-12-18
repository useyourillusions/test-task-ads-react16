import React, {Component} from 'react';
import { connect } from 'react-redux';
import { getAd } from '../../actions/SingleAdAction';
import CommentAreaComponent from '../CommentAreaComponent/CommentAreaComponent';
import NewCommentComponent from '../NewCommentComponent/NewComentComponent'
import PropTypes from 'prop-types';
import './SingleAdComponent.css';


const CommentsList = ({comments, processing}) => {
    if (comments.isLoading) {
        return <h3 style={{textAlign: 'center'}}>Loading...</h3>;
    }

    if (comments.data.length) {
        return (
            <ul className="l-comments">
                {
                    comments.data.map(comment => {
                        const isUpdating = processing.isUpdating && processing.id === comment._id;
                        const isRemoving = processing.isRemoving && processing.id === comment._id;

                        return <li className={`l-comments__item${isUpdating ? ' _updating' : ''}${isRemoving ? ' _removing' : ''}`}
                                   key={comment._id}>
                            <div className="l-comments__user">
                                <img src={comment.author.photo} className="l-comments__user-img" alt="" />
                                <span className="l-comments__user-name">
                                    {`${comment.author.firstName} ${comment.author.lastName}`}
                                </span>
                            </div>
                            <CommentAreaComponent currentComment={comment}/>
                        </li>
                    })
                }
            </ul>
        );
    }

    return <p>There is no comments yet...</p>;
};

const SingleAd = ({singleAd}) => {
    const ad = singleAd.data;

    return (
        <section className="s-ad">
            <div className="container">
                {
                    singleAd.isLoading
                        ?
                        <h3 style={{textAlign: 'center'}}>Loading...</h3>
                        :
                        <div className="b-ad">
                            <h2 className="b-ad__title">{ad.title}</h2>
                            <img src={ad.img}
                                 className="b-ad__img"
                                 alt={ad.title} />
                            <p className="b-ad__text">{ad.text}</p>
                        </div>
                }
            </div>
        </section>
    )
};

class SingleAdComponent extends Component {
    componentDidMount() {
        this.id = this.props.match.params['ad'];
        this.props.getAd(this.id);
    }

    render() {
        return (
            <div>
                <SingleAd singleAd={this.props.singleAd} />
                <section className="s-comments">
                    <div className="container">
                        <div className="s-comments__inner">
                            <NewCommentComponent adId={this.id} />
                            <h4 className="s-comments__title">Comments:</h4>
                            <CommentsList
                                comments={this.props.comments}
                                processing={this.props.commentsProcessing} />
                        </div>
                    </div>
                </section>
            </div>
        )
    }
}

const mapStateToProps = ({singleAd, comments, commentsProcessing}) => ({singleAd, comments, commentsProcessing});
const mapDispatchToProps = dispatch => ({
    getAd: id => dispatch(getAd(id))
});

SingleAdComponent.propTtypes = {
    isLoading: PropTypes.bool,
    data: PropTypes.object
};

export default connect(mapStateToProps, mapDispatchToProps)(SingleAdComponent);
