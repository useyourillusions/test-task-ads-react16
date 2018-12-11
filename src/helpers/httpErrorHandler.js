const errorHandler = (res) => {
    const data = res.response.data;
    alert(data.message);
};

export default errorHandler;
