const responseSender = (res, code, message) => {
    res
        .status(code)
        .json({
            code,
            message
        })
};

module.exports = responseSender;