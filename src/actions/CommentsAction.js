import http from '../helpers/axiosCustomInstance';
import errorHandler from '../helpers/httpErrorHandler';
import { commentSending, commentUpdating, commentRemoving } from './CommentsProcessingAction';


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
        dispatch(commentSending(true));

        http.sendComment(comment).then(
            res => {
                console.log(res);
                const comment = res.data.content;

                dispatch(commentSent(comment));
                dispatch(commentSending(false));
            },
            err => {
                errorHandler(err).then(
                    res => {
                        console.log(res);

                        if (res.code === 200) {
                            sendComment(comment)(dispatch);
                        } else {
                            dispatch(commentSending(false))
                        }
                    }
                );
            }
        );
    };

const updateComment = data =>
    dispatch => {
        dispatch(commentUpdating({state: true, id: data.id}));

        http.updateComment(data).then(
            res => {
                console.log(res);
                dispatch(commentUpdated(data));
                dispatch(commentUpdating({state: false, id: null}));
            },
            err => {
                errorHandler(err).then(
                    res => {
                        console.log(res);

                        if (res.code === 200) {
                            updateComment(data)(dispatch);
                        } else {
                            dispatch(commentUpdating({state: false, id: null}));
                        }
                    }
                );
            }
        );
    };

const removeComment = id =>
    dispatch => {
        dispatch(commentRemoving({state: true, id}));

        http.removeComment(id).then(
            res => {
                console.log(res);
                dispatch(commentRemoved(id));
                dispatch(commentRemoving({state: false, id: null}));
            },
            err => {
                errorHandler(err).then(
                    res => {
                        console.log(res);

                        if (res.code === 200) {
                            removeComment(id)(dispatch);
                        } else {
                            dispatch(commentRemoving({state: false, id: null}));
                        }
                    }
                );
            }
        );
    };

export { commentsLoaded, sendComment, updateComment, removeComment };
