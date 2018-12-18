import http from '../helpers/axiosCustomInstance';
import errorHandler from '../helpers/httpErrorHandler';
import { commentUpdating, commentRemoving } from './CommentsProcessingAction';


const commentsLoaded = array => ({
    type: 'COMMENTS_LOADED',
    payload: array
});

const commentSent = obj => ({
    type: 'COMMENT_SENT',
    payload: obj
});

const commentUpdated = obj => ({
    type: 'COMMENT_UPDATED',
    payload: obj
});

const commentRemoved = string => ({
    type: 'COMMENT_REMOVED',
    payload: string
});


const sendComment = comment =>
    dispatch => {
        http.sendComment(comment)
            .then(
                res => {
                    console.log(res);
                    const comment = res.data.content;
                    dispatch(commentSent(comment))
                },
                err => {
                    console.log(errorHandler(err));
                }
            );
    };

const updateComment = data =>
    dispatch => {
        dispatch(commentUpdating({state: true, id: data.id}));
        http.updateComment(data)
            .then(
                res => {
                    console.log(res);
                    dispatch(commentUpdated(data));
                },
                err => {
                    console.log(errorHandler(err));
                }
            )
            .finally(() => dispatch(commentUpdating({state: false, id: null})));
    };

const removeComment = id =>
    dispatch => {
        dispatch(commentRemoving({state: true, id}));
        http.removeComment(id)
            .then(
                res => {
                    console.log(res);
                    dispatch(commentRemoved(id));
                },
                err => {
                    console.log(errorHandler(err));
                }
            )
            .finally(() => commentRemoving({state: false, id: null}));
    };

export { commentsLoaded, sendComment, updateComment, removeComment };
