const initialState = {
    isLoading: true,
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
                isLoading: false,
                data: action.payload
            }
        }

        default: return state;
    }
};

export default singleAd;
