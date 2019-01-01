import React, { Component } from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { getAllAds } from '../../actions/AllAdsAction';
import PropTypes from 'prop-types';
import './HomeComponent.css';

class HomeComponent extends Component {
    componentDidMount() {
        this.props.getAllAds();
    }

    render() {
        if (this.props.allAds.isLoading) {
            return (
                <section className="s-ads">
                    <div className="container">
                        <h3 style={{textAlign: 'center'}}>Loading...</h3>
                    </div>
                </section>
            )
        }

        return (
            <section className="s-ads">
                <div className="container">
                    <ul className="l-ads">
                        {
                            this.props.allAds.data.map(item => (
                                <li className="l-ads__item" key={item._id}>
                                    <NavLink to={`ad/${item._id}`} className="l-ads__item-img-link">
                                        <img src={item.img}
                                             className="l-ads__item-img"
                                             alt={item.title} />
                                    </NavLink>
                                    <h4 className="l-ads__item-title">
                                        {item.title}
                                    </h4>
                                    <p className="l-ads__item-text">
                                        {item.text}
                                    </p>
                                    <NavLink to={`ad/${item._id}`}
                                             className="l-ads__item-link">
                                        Read more
                                    </NavLink>
                                </li>
                            ))
                        }
                    </ul>
                </div>
            </section>
        )
    }
}

const mapStateToProps = ({allAds}) => ({allAds});
const mapDispatchToProps = dispatch => ({
    getAllAds: () => dispatch(getAllAds())
});

HomeComponent.propTtypes = {
    isLoading: PropTypes.bool,
    data: PropTypes.object
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeComponent);
