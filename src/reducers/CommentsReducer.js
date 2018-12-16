const initialState = {
    isUpdating: false,
    isSending: false,
    data: []
};

const filterRemoved = id =>
    item => item._id !== id;

const mapUpdated = data =>
    comment => {
        if (comment._id === data.id) {
            comment.text = data.text;
        }
        return comment;
    };

const comments = (state = initialState, action) => {
    switch(action.type) {
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
        case 'COMMENT_SENT': {
            return {
                ...state,
                isSending: false,
                data: [
                    ...state.data,
                    action.payload
                ]
            }
        }
        case 'COMMENT_UPDATING': {
            return {
                ...state,
                isUpdating: true
            }
        }
        case 'COMMENT_UPDATED': {
            return {
                ...state,
                isUpdating: false,
                data: [
                    ...state.data.map(mapUpdated(action.payload))
                ]
            }
        }
        case 'COMMENT_REMOVING': {
            return {
                ...state,
                isRemoving: true
            }
        }
        case 'COMMENT_REMOVED': {
            return {
                ...state,
                isRemoving: false,
                data: [
                    ...state.data.filter(filterRemoved(action.payload))
                ]
            }
        }

        default: return state;
    }
};

export default comments;
