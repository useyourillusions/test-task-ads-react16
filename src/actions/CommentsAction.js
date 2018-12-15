import http from '../helpers/axiosCustomInstance';
import errorHandler from '../helpers/httpErrorHandler';

const commentsLoaded = array => ({
    type: 'COMMENTS_LOADED',
    payload: array
});

const commentRemoved = string => ({
    type: 'COMMENT_REMOVED',
    payload: string
});

const commentSending = bool => ({
    type: 'COMMENT_SENDING',
    payload: bool
});

const displayNewComment = obj => ({
    type: 'COMMENT_DISPLAY_NEW',
    payload: obj
});

const postComment = comment => (
    dispatch => {
        dispatch(commentSending(true));
        setTimeout(() => {
            dispatch(displayNewComment(comment));
        }, 2000);
    }
);

const saveEdited = data => (
    dispatch => {
        console.log(data);
    }
);

const removeComment = id => (
    dispatch => {
        console.log(id);
        dispatch(commentRemoved(id));
    }
);

export { commentsLoaded, postComment, saveEdited, removeComment };
