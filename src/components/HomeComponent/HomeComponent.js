import React, { Component } from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { getShortAds } from '../../actions/HomeAction';
import PropTypes from 'prop-types';
import './HomeComponent.css';

class HomeComponent extends Component {
    componentDidMount() {
        this.props.getShortAds();
    }

    render() {
        if (this.props.shortAds.isLoading) {
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
                            this.props.shortAds.data.map((item, i) => (
                                <li className="l-ads__item" key={i}>
                                    <NavLink to={`ads/${i}`} className="l-ads__item-img-link">
                                        <img src="https://dummyimage.com/600x400/000/00ffd5.png" className="l-ads__item-img" alt="" />
                                    </NavLink>
                                    <h4 className="l-ads__item-title">Default title {i + 1}</h4>
                                    <p className="l-ads__item-text">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consequuntur, dolor dolorem enim eum eveniet
                                        expedita facilis molestiae natus nesciunt porro quos ratione ullam velit, voluptate voluptatem.
                                        Accusamus commodi eos quia quo. Assumenda consequuntur debitis dolor dolorem ea eaque est ex labore
                                        natus obcaecati odit officia pariatur perferendis praesentium, quod voluptatum.</p>
                                    <NavLink to={`ads/${i}`} className="l-ads__item-link">Read more</NavLink>
                                </li>
                            ))
                        }
                    </ul>
                </div>
            </section>
        )
    }
}

const mapStateToProps = ({shortAds}) => ({shortAds});
const mapDispatchToProps = (dispatch) => ({
    getShortAds: () => dispatch(getShortAds())
});

HomeComponent.propTtypes = {
    isLoading: PropTypes.bool,
    data: PropTypes.object
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeComponent);
