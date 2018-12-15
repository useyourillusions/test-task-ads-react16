const initialState = {
    isLoading: false,
    isSending: false,
    data: []
};

const mapRemoved = id => (
    item => item._id !== id
);


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
                data: action.payload
            }
        }
        case 'COMMENT_SENDING': {
            return {
                ...state,
                isSending: action.payload
            }
        }
        case 'COMMENT_DISPLAY_NEW': {
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
