import { combineReducers } from 'redux';
import allAds from './AllAdsReducer';
import singleAd from './SingleAdReducer';
import comments from './CommentsReducer';
import userData from './AuthReducer'

export default combineReducers({
    allAds,
    singleAd,
    comments,
    userData
});
