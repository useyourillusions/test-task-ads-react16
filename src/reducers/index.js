import { combineReducers } from 'redux';
import allAds from './AllAdsReducer';
import singleAd from './SingleAdReducer';
import comments from './CommentsReducer';
import commentsProcessing from './CommentsProcessingReducer';
import userData from './AuthReducer';

export default combineReducers({
    allAds,
    singleAd,
    comments,
    commentsProcessing,
    userData
});
