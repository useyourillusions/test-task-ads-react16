const initialState = {
    id: null,
    isUpdating: false,
    isRemoving: false
};


const commentsProcessing = (state = initialState, action) => {
    switch(action.type) {
        case 'COMMENT_UPDATING': {
            return {
                ...state,
                id: action.payload.id,
                isUpdating: action.payload.state
            }
        }
        case 'COMMENT_REMOVING': {
            return {
                ...state,
                id: action.payload.id,
                isRemoving: action.payload.state
            }
        }

        default: return state;
    }
};

export default commentsProcessing;
