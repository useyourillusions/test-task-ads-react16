const shortAdsLoaded = array => ({
    type: 'SHORT-ADS_LOADED',
    payload: array
});

const shortAdsLoading = bool => ({
    type: 'SHORT-ADS_LOADING',
    payload: bool
});

const shortAdsError = object => ({
    type: 'SHORT-ADS_LOADING_ERROR',
    payload: object
});

const getShortAds = () => {
    return dispatch => {
        dispatch(shortAdsLoading(true));
        setTimeout(() => {
            const arr = [0, 1, 2, 3];
            dispatch(shortAdsLoaded(arr));
        }, 2000);

        /*axios.get('http://localhost:5000/api/cards').then(
            res => {
                if (res.data && res.data.cards && res.data.cards.length) {
                    dispatch(cardsLoaded(res.data.cards));
                }
            }, err => {
                dispatch(cardsLoading(false));
                dispatch(loadingError(err.response.data));
                console.log(err.response);
            });*/
    }
};

export { shortAdsLoaded, shortAdsLoading, getShortAds };
