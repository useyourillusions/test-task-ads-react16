const errorHandler = res => {
    const data = res.response.data;
    alert(data.message);

    return data;
};

export default errorHandler;
