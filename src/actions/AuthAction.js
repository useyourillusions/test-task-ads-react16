import errorHandler from '../helpers/httpErrorHandler';
import http from '../helpers/axiosCustomInstance';

const authProcess = bool => ({
    type: 'SIGN-IN_PROCESS',
    payload: bool
});

const authSuccess = obj => ({
    type: 'SIGN-IN_SUCCESS',
    payload: obj
});

const logoutProcess = bool => ({
    type: 'LOGOUT_PROCESS',
    payload: bool
});

const logoutFinish = () => ({
    type: 'LOGOUT_END'
});

const proceedSignIn = dataToSend => (
    dispatch => {
        dispatch(authProcess(true));

        http.signIn(dataToSend)
            .then(
                res => {
                    console.log(res);
                    const user = res.data.content.user;
                    dispatch(authSuccess(user));
                },
                err => {
                    dispatch(authProcess(false));
                    errorHandler(err).then(res => console.log(res));
                }
        );
    }
);

const proceedLogout = () => (
    dispatch => {
        dispatch(logoutProcess(true));

        http.logout()
            .then(
                res => {
                    console.log(res);
                },
                err => {
                    console.log(err);
                }
            )
            .finally(
                () => {
                    localStorage.removeItem('token');
                    dispatch(logoutFinish());
                }
            );
    }
);


export { authSuccess, proceedSignIn, proceedLogout };
