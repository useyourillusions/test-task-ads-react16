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

const logoutEnd = () => ({
    type: 'LOGOUT_END'
});


const proceedSignIn = formSignInData => (
    dispatch => {
        dispatch(authProcess(true));

        http.signIn(formSignInData).then(
            res => {
                console.log(res);
                const userData = res.data.content.user;
                dispatch(authSuccess(userData));
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
                })
            .finally(
                () => {
                    localStorage.removeItem('token');
                    dispatch(logoutEnd());
                }
            );
    }
);

const getUserData = () => (
    dispatch => {
        http.getUserData().then(
            res => {
                console.log(res);
                const userData = res.data.content;
                dispatch(authSuccess(userData));
            },
            err => {
                errorHandler(err).then(
                    res => {
                        console.log(res);

                        if (res.code === 200) {
                            getUserData()(dispatch);
                        } else {
                            dispatch(proceedLogout());
                        }
                    }
                );
            }
        );
    }
);


export { authSuccess, proceedSignIn, proceedLogout, getUserData };
