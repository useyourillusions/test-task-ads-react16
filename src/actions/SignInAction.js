const signInProcess = bool => ({
    type: 'SIGN-IN_PROCESS',
    payload: bool
});

const signInSuccess = obj => ({
    type: 'SIGN-IN_SUCCESS',
    payload: obj
});

const signInError = object => ({
    type: 'SIGN-IN_ERROR',
    payload: object
});

const signInLogout = () => ({
    type: 'SIGN-IN_LOGOUT'
});

const sendData = data => (
    dispatch => {
        const userData = {
            id: 1,
            firstName: 'John',
            lastName: 'Doe',
            email: 'john@doe.com',
            photo: 'https://dummyimage.com/300x300/000/ff7800.png'
        };

        dispatch(signInProcess(true));
        setTimeout(() => dispatch(signInSuccess(userData)), 2000);
    }
);

export { signInSuccess, sendData, signInLogout };
