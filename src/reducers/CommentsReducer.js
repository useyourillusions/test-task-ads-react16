const initialState = {
    isLoading: false,
    isSending: false,
    errorData: {
        hasError: false,
        errorCode: null,
        errorMessage: null
    },
    data: []
};

const comments = (state = initialState, action) => {
    switch(action.type) {
        case 'COMMENTS_LOADING': {
            return {
                ...state,
                isLoading: action.payload
            }
        }
        case 'COMMENTS_LOADED': {
            return {
                ...state,
                isLoading: false,
                data: action.payload
            }
        }
        case 'COMMENTS_LOADING_ERROR': {
            return {
                ...state,
                isLoading: false,
                errorData: action.payload
            }
        }
        case 'COMMENT_SENDING': {
            return {
                ...state,
                isSending: action.payload
            }
        }
        case 'DISPLAY_NEW_COMMENT': {
            return {
                ...state,
                isSending: false,
                data: [
                    ...state.data,
                    action.payload
                ]
            }
        }

        default: return state;
    }
};

export default comments;
