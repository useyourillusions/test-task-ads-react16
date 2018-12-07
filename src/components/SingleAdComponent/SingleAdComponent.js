import React, {Component} from 'react';
import { connect } from 'react-redux';
import { getSingleAd } from '../../actions/SingleAdAction';
import CommentsComponent from '../CommentsComponent/CommentsComponent'
import PropTypes from 'prop-types';
import './SingleAdComponent.css';

const SingleAd = ({props}) => {
    if (props.isLoading) {
        return (
            <section className="s-ad">
                <div className="container">
                    <h3 style={{textAlign: 'center'}}>Loading...</h3>
                </div>
            </section>
        )
    }

    return (
        <section className="s-ad">
            <div className="container">
                <div className="b-ad">
                    <h2 className="b-ad__title">{props.data.title}</h2>
                    <img src={props.data.img}
                         className="b-ad__img"
                         alt={props.data.title} />
                    <p className="b-ad__text">{props.data.text}</p>
                </div>
            </div>
        </section>
    )
};

class SingleAdComponent extends Component {
    componentDidMount() {
        let id = this.props.match.params['ad'];
        this.props.getSingleAd(+id+1);
    }

    render() {
        return (
            <div>
                <SingleAd props={this.props.singleAd} />
                <CommentsComponent/>
            </div>
        )
    }
}

const mapStateToProps = ({singleAd}) => ({singleAd});
const mapDispatchToProps = (dispatch) => ({
    getSingleAd: (id) => dispatch(getSingleAd(id))
});

SingleAdComponent.propTtypes = {
    isLoading: PropTypes.bool,
    data: PropTypes.object
};

export default connect(mapStateToProps, mapDispatchToProps)(SingleAdComponent);
