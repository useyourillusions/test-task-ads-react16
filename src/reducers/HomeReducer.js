const initialState = {
    isLoading: false,
    errorData: {
        hasError: false,
        errorCode: null,
        errorMessage: null
    },
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
        case 'SHORT-ADS_LOADING_ERROR': {
            return {
                ...state,
                isLoading: false,
                errorData: action.payload
            }
        }

        default: return state;
    }
};

export default shortAds;
