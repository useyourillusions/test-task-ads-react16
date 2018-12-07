const commentsLoaded = array => ({
    type: 'COMMENTS_LOADED',
    payload: array
});

const commentsLoading = bool => ({
    type: 'COMMENTS_LOADING',
    payload: bool
});

const commentsError = object => ({
    type: 'COMMENTS_LOADING_ERROR',
    payload: object
});

const getComments = () => (
    dispatch => {
        dispatch(commentsLoading(true));

        setTimeout(() => {
            const arr = [
                {
                    user: {
                        img: 'https://dummyimage.com/300x300/000/ff7800.png',
                        name: 'John Doe'
                    },
                    text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquid aspernatur aut consequatur debitis, deleniti distinctio facilis ipsam, iste libero maiores mollitia, nam natus nemo nobis obcaecati provident quaerat quidem voluptate!'
                },
                {
                    user: {
                        img: 'https://dummyimage.com/300x300/000/ff7800.png',
                        name: 'John Doe'
                    },
                    text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquid aspernatur aut consequatur debitis, deleniti distinctio facilis ipsam, iste libero maiores mollitia, nam natus nemo nobis obcaecati provident quaerat quidem voluptate!'
                },
                {
                    user: {
                        img: 'https://dummyimage.com/300x300/000/ff7800.png',
                        name: 'John Doe'
                    },
                    text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquid aspernatur aut consequatur debitis, deleniti distinctio facilis ipsam, iste libero maiores mollitia, nam natus nemo nobis obcaecati provident quaerat quidem voluptate!'
                }
            ];
            dispatch(commentsLoaded(arr));
        }, 2000);
    }
);

const commentSending = bool => ({
    type: 'COMMENT_SENDING',
    payload: bool
});

const displayNewComment = obj => ({
    type: 'DISPLAY_NEW_COMMENT',
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

export { commentsLoaded, commentsLoading, getComments, postComment };
