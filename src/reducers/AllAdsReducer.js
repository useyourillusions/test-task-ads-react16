const initialState = {
    isLoading: false,
    data: []
};

const allAds = (state = initialState, action) => {
    switch(action.type) {
        case 'ALL-ADS_LOADING': {
            return {
                ...state,
                isLoading: action.payload
            }
        }
        case 'ALL-ADS_LOADED': {
            return {
                isLoading: false,
                data: action.payload
            }
        }

        default: return state;
    }
};

export default allAds;
