const initialState = {
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
                data: action.payload
            }
        }
        case 'COMMENT_SENT': {
            return {
                data: [
                    ...state.data,
                    action.payload
                ]
            }
        }
        case 'COMMENT_UPDATED': {
            return {
                data: [
                    ...state.data
                        .map(mapUpdated(action.payload))
                ]
            }
        }
        case 'COMMENT_REMOVED': {
            return {
                data: [
                    ...state.data
                        .filter(filterRemoved(action.payload))
                ]
            }
        }

        default: return state;
    }
};

export default comments;
