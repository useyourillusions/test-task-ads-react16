import { combineReducers } from 'redux';
import shortAds from './HomeReducer';
import singleAd from './SingleAdReducer';
import comments from './CommentsReducer';
import userData from './SignInReducer'

export default combineReducers({
    shortAds,
    singleAd,
    comments,
    userData
});
