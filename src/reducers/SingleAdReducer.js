const initialState = {
    isLoading: true,
    errorData: {
        hasError: false,
        errorCode: null,
        errorMessage: null
    },
    data: {}
};

const singleAd = (state = initialState, action) => {
    switch(action.type) {
        case 'SINGLE-AD_LOADING': {
            return {
                ...state,
                isLoading: action.payload
            }
        }
        case 'SINGLE-AD_LOADED': {
            return {
                ...state,
                isLoading: false,
                data: action.payload
            }
        }
        case 'SINGLE-AD_LOADING_ERROR': {
            return {
                ...state,
                isLoading: false,
                errorData: action.payload
            }
        }

        default: return state;
    }
};

export default singleAd;
