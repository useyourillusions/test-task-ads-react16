const errorHandler = res => {
    let data = {};

    try {
        data = res.response.data;
        alert(data.message);

    } catch (err) {
        data = {
            code: 0,
            message: err.message
        }
    }

    return data;
};

export default errorHandler;
