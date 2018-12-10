const responseSender = (res, code, message, content = null) => {
    res
        .status(code)
        .json({
            code,
            message,
            content
        })
};

module.exports = responseSender;
