const commentUpdating = obj => ({
    type: 'COMMENT_UPDATING',
    payload: obj
});

const commentRemoving = obj => ({
    type: 'COMMENT_REMOVING',
    payload: obj
});


export { commentUpdating, commentRemoving };
