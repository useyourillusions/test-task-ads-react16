const initialState = {
    isLoading: false,
    data: []
};

const shortAds = (state = initialState, action) => {
    switch(action.type) {
        case 'SHORT-ADS_LOADING': {
            return {
                ...state,
                isLoading: action.payload
            }
        }
        case 'SHORT-ADS_LOADED': {
            return {
                ...state,
                isLoading: false,
                data: action.payload
            }
        }

        default: return state;
    }
};

export default shortAds;
