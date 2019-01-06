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

    onMouse(e) {
        const x = e.pageX - e.currentTarget.offsetLeft;
        const y = e.pageY - e.currentTarget.offsetTop;

        e.currentTarget.style.setProperty('--x', `${ x }px`);
        e.currentTarget.style.setProperty('--y', `${ y }px`);
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
                                             className="l-ads__item-link"
                                             onMouseMove={this.onMouse}
                                             style={{'--x':'0px', '--y':'0px'}}>
                                        <span>Read more</span>
                                    </NavLink>
                                    <div className="l-ads__item-info">
                                        <div className="l-ads__item-user">
                                            <img className="l-ads__item-user-img"
                                                 src="https://dummyimage.com/300x300/000/ff7800.png"
                                                 alt="" />
                                            <span className="l-ads__item-user-name">Yura Aliakseyeu posted this at 10.10.2018</span>
                                        </div>
                                        <div className="l-ads__item-statistics">
                                            <div className="l-ads__item-statistics-icon" title="Views">
                                                <svg className="svg-watched" version="1.2">
                                                    <use xlinkHref="#svg-watched"/>
                                                </svg>
                                                <span>0</span>
                                            </div>
                                            <div className="l-ads__item-statistics-icon" title="Comments">
                                                <svg className="svg-comments" version="1.2">
                                                    <use xlinkHref="#svg-comments"/>
                                                </svg>
                                                <span>0</span>
                                            </div>
                                        </div>
                                    </div>
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
