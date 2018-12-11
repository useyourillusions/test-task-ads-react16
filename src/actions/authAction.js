import errorHandler from '../helpers/httpErrorHandler';
import http from '../helpers/AxiosCustomInstance';
import env from '../environment';

const authProcess = bool => ({
    type: 'AUTH_PROCESS',
    payload: bool
});

const authSuccess = obj => ({
    type: 'AUTH_SUCCESS',
    payload: obj
});

const authLogout = () => ({
    type: 'AUTH_LOGOUT'
});

const sendData = dataToSend => (
    dispatch => {
        dispatch(authProcess(true));

        http.post(
            `/${env.api.signInRoute}`,
            dataToSend
        )
        .then(
            res => {
                const data = res.data;

                localStorage.setItem('token', data.content.token);
                dispatch(authSuccess(data.content.user));
            },
            err => {
                dispatch(authProcess(false));
                console.log(errorHandler(err));
            }
        );
    }
);

export { authSuccess, sendData, authLogout };
