import axios from 'axios';
import env from '../environment';

const interceptorAxios = () => {
    const instance = axios.create({baseURL: `${env.api.uri}:${env.api.port}/`});
    const token = localStorage.getItem('token');

    instance.interceptors.request.use(config => {
        const isAuthNeededAd = config.url.indexOf(env.api.adRoute) >= 0 &&
            ['post', 'put'].indexOf(config.method) >= 0;

        const isAuthNeededComments = config.url.indexOf(env.api.commentsRoute) >= 0 &&
            ['post', 'put', 'delete'].indexOf(config.method) >= 0;

        if (isAuthNeededAd || isAuthNeededComments) {
            config.headers['Authorization'] = 'Bearer ' + token;
        }

        return config;
    });

    return instance;
};

const http = {
    register(body = {}) {
        return interceptorAxios().post(env.api.registerRoute, body);
    },

    signIn(body = {}) {
        return interceptorAxios().post(env.api.signInRoute, body);
    },

    getAllAds() {
        return interceptorAxios().get(env.api.adRoute);
    },

    getAdById(id) {
        if (id) {
            const query = '?id=' + id;
            return interceptorAxios().get(env.api.adRoute + query);
        }
    },

    sendComment(body = {}) {
        return interceptorAxios().post(env.api.commentsRoute, body)
    },

    updateComment(body = {}) {
        return interceptorAxios().put(env.api.commentsRoute, body);
    },

    removeComment(id = '') {
        return interceptorAxios().delete(`${env.api.commentsRoute}/${id}`);
    }
};

export default http;
