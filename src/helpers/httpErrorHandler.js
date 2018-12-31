import http from './axiosCustomInstance';

const prepareErrorData = data => {
    let preparedData = {};

    try {
        preparedData = data.response.data;

    } catch (err) {
        preparedData = {
            code: 0,
            message: err.message
        }
    }

    return preparedData;
};

const errorHandler = error => {
    let data = prepareErrorData(error);

    if (data.content && data.content.needRefresh) {
        return http.refreshToken().then(
            res => {
                return Promise.resolve(res.data);
            },
            err => {
                const data = prepareErrorData(err);
                alert(data.message);

                return Promise.resolve(data);
            }
        );
    }

    alert(data.message);
    return Promise.resolve(data);
};

export default errorHandler;
