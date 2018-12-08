const wrongRouteHandler = (req, res) => {
    res
        .status(404)
        .set({
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Headers': 'origin, content-type, accept'
        })
        .json({
            code: 404,
            errorMessage: 'Resource not found...'
        });
};

module.exports = wrongRouteHandler;