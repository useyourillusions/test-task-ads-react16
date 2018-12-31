import http from '../helpers/axiosCustomInstance';
import errorHandler from '../helpers/httpErrorHandler';

const allAdsLoaded = array => ({
    type: 'ALL-ADS_LOADED',
    payload: array
});

const allAdsLoading = bool => ({
    type: 'ALL-ADS_LOADING',
    payload: bool
});

const getAllAds = () => {
    return dispatch => {
        dispatch(allAdsLoading(true));

        http.getAllAds().then(
            res => {
                console.log(res);
                const data = res.data;
                dispatch(allAdsLoaded(data));
            },
            err => {
                errorHandler(err).then(res => console.log(res));
            }
        );
    }
};

export { allAdsLoaded, allAdsLoading, getAllAds };
