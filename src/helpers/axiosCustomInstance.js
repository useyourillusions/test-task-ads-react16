import axios from 'axios';
import env from '../environment';

const interceptorAxios = () => {
    const instance = axios.create({baseURL: `${env.api.uri}:${env.api.port}/`});
    const token = JSON.parse(localStorage.getItem('token'));

    instance.interceptors.request.use(config => {
        const isAuthNeededForUserData = config.url.indexOf(env.apiRoutes.user) >= 0;

        const isAuthNeededForAd = config.url.indexOf(env.apiRoutes.ads) >= 0 &&
            ['post', 'put'].indexOf(config.method) >= 0;

        const isAuthNeededForComments = config.url.indexOf(env.apiRoutes.comments) >= 0 &&
            ['post', 'put', 'delete'].indexOf(config.method) >= 0;

        const isRefreshNeeded = config.url.indexOf(env.apiRoutes.refreshToken) >= 0;
        const isLogout = config.url.indexOf(env.apiRoutes.logout) >= 0;

        if (
            isAuthNeededForUserData ||
            isAuthNeededForAd ||
            isAuthNeededForComments
        ) {
            config.headers['Authorization'] = 'Bearer ' + token.accessToken;

        } else if ((isRefreshNeeded || isLogout) && token.refreshToken) {
            config.data = { refreshToken: token.refreshToken };
        }

        return config;
    });

    instance.interceptors.response.use(
        res => {
            if (
                res.data &&
                res.data.content &&
                res.data.content.token
            ) {
                localStorage.setItem('token', JSON.stringify(res.data.content.token));
            }

            return res;
        }
    );

    return instance;
};

const http = {
    getUserData() {
        return interceptorAxios().get(env.apiRoutes.user);
    },

    register(body = {}) {
        return interceptorAxios().post(env.apiRoutes.register, body);
    },

    signIn(body = {}) {
        return interceptorAxios().post(env.apiRoutes.signIn, body);
    },

    getAllAds() {
        return interceptorAxios().get(env.apiRoutes.ads);
    },

    getSingleAd(id) {
        if (id) {
            const query = '?id=' + id;
            return interceptorAxios().get(env.apiRoutes.ads + query);
        }
    },

    sendComment(body = {}) {
        return interceptorAxios().post(env.apiRoutes.comments, body)
    },

    updateComment(body = {}) {
        return interceptorAxios().put(env.apiRoutes.comments, body);
    },

    removeComment(id = '') {
        return interceptorAxios().delete(`${env.apiRoutes.comments}/${id}`);
    },

    refreshToken() {
        return interceptorAxios().post(env.apiRoutes.refreshToken);
    },

    logout() {
        return interceptorAxios().post(env.apiRoutes.logout);
    }
};

export default http;
