/**
 * Created by jamais on 2017/5/5.
 */

import * as axios from 'axios';
import {default as md5} from 'blueimp-md5';
require('es6-promise').polyfill();

let mAuthKey = '';

const mAxiosInstance = axios.create({
    // baseURL: '/',
    timeout: 20000
});

mAxiosInstance.interceptors.request.use(function (config) {
    config.data = config.data || {};
    config.headers['Authorization'] = md5(JSON.stringify(config.data), mAuthKey);
    return config;
});

export function getAxiosInstance(authKey) {
    if (authKey) {
        mAuthKey = authKey;
    }

    return mAxiosInstance;
}

export const URL_PATH = {
    SHORTEN: '/api/shorten/'
};
