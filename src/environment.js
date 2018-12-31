const environment = {
    mode: 'dev',

    dev: {
        api: {
            port: '5000',
            uri: 'http://localhost'
        },
        apiRoutes: {
            user: 'api/user',
            register: 'api/register',
            signIn: 'api/sign-in',
            ads: 'api/ad',
            comments: 'api/comments',
            refreshToken: 'api/refresh',
            logout: 'api/logout'
        }
    },

    prod: {}
};

export default environment[environment.mode];
