import axios from 'axios';
import env from '../environment';

const interceptAxios = () => {
    const instance = axios.create({baseURL: `${env.api.uri}:${env.api.port}/`});

    instance.interceptors.request.use(config => {
        const isAuthNeededAd = config.url.indexOf(env.api.adRoute) > 0 &&
            ['post', 'put'].indexOf(config.method) > 0;

        const isAuthNeededComments = config.url.indexOf(env.api.commentsRoute) > 0 &&
            ['post', 'put, delete'].indexOf(config.method) > 0;

        if (isAuthNeededAd || isAuthNeededComments) {
            config.headers['Authorization'] = 'Bearer ';
        }

        return config;
    });

    return instance;
};

const http = {
    getAllAds() {
        return interceptAxios().get(env.api.adRoute);
    },

    getAdById(id) {
        if (id) {
            const query = '?id=' + id;
            return interceptAxios().get(env.api.adRoute + query);
        }
    },

    register(body = {}) {
        return interceptAxios().post(env.api.registerRoute, body);
    },

    signIn(body = {}) {
        return interceptAxios().post(env.api.signInRoute, body);
    }
};

export default http;
