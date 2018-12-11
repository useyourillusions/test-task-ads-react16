const environment = {
  mode: 'dev',

  dev: {
    api: {
      port: '5000',
      uri: 'http://localhost',
      registerRoute: 'api/register',
      signInRoute: 'api/sign-in',
      adRoute: 'api/ad',
      commentsRoute: 'api/comments'
    }
  },

  prod: {
  }
};

export default environment[environment.mode];
