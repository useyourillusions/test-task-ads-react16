import http from '../helpers/axiosCustomInstance';
import errorHandler from '../helpers/httpErrorHandler';


const commentsLoaded = array => ({
    type: 'COMMENTS_LOADED',
    payload: array
});

const commentSending = bool => ({
    type: 'COMMENT_SENDING',
    payload: bool
});

const commentSent = obj => ({
    type: 'COMMENT_SENT',
    payload: obj
});

const commentUpdating = bool => ({
    type: 'COMMENT_UPDATING',
    payload: bool
});

const commentUpdated = obj => ({
    type: 'COMMENT_UPDATED',
    payload: obj
});

const commentRemoving = bool => ({
    type: 'COMMENT_REMOVING',
    payload: bool
});

const commentRemoved = string => ({
    type: 'COMMENT_REMOVED',
    payload: string
});


const sendComment = comment =>
    dispatch => {
        dispatch(commentSending(true));
        http.sendComment(comment)
            .then(
                res => {
                    console.log(res);
                    const comment = res.data.content;
                    dispatch(commentSent(comment))
                },
                err => {
                    dispatch(commentSending(false));
                    console.log(errorHandler(err));
                }
            );
    };

const updateComment = (data, cb) =>
    dispatch => {
        dispatch(commentUpdating(true));
        http.updateComment(data)
            .then(
                res => {
                    console.log(res);
                    dispatch(commentUpdated(data));
                    cb();
                },
                err => {
                    dispatch(commentUpdating(false));
                    console.log(errorHandler(err));
                }
            );
    };

const removeComment = id =>
    dispatch => {
        dispatch(commentRemoving(true));
        http.removeComment(id)
            .then(
                res => {
                    console.log(res);
                    dispatch(commentRemoved(id));
                },
                err => {
                    commentRemoving(false);
                    console.log(errorHandler(err));
                }
            );
    };

export { commentsLoaded, sendComment, updateComment, removeComment };
