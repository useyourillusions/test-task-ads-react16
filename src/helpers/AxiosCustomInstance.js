import axios from 'axios';
import env from '../environment';

const http = axios.create({
    baseURL: `${env.api.uri}:${env.api.port}`
});

http.interceptors.request.use(config => {

    const isAuthNeededAd = config.url.indexOf(env.api.adRoute) > 0 &&
        ['post', 'put'].indexOf(config.method) > 0;

    const isAuthNeededComments = config.url.indexOf(env.api.commentsRoute) > 0 &&
        ['post', 'put, delete'].indexOf(config.method) > 0;

    if (isAuthNeededAd || isAuthNeededComments) {
        config.headers['Authorization'] = 'Bearer ';
    }

    return config;
});

export default http;
