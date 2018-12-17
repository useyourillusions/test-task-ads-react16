import { commentsLoaded } from './CommentsAction';
import errorHandler from '../helpers/httpErrorHandler';
import http from '../helpers/axiosCustomInstance';

const singleAdLoaded = object => ({
    type: 'SINGLE-AD_LOADED',
    payload: object
});

const singleAdLoading = bool => ({
    type: 'SINGLE-AD_LOADING',
    payload: bool
});

const getAd = id => {
    return dispatch => {
        dispatch(singleAdLoading(true));

        http.getSingleAd(id)
            .then(
                res => {
                    const { comments, ...ad } = res.data;

                    dispatch(singleAdLoaded(ad));
                    dispatch(commentsLoaded(comments));
                },
                err => {
                    console.log(errorHandler(err));
                }
            );
    }
};

export { getAd };
