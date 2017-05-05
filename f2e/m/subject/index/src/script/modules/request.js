/**
 * Created by Jamais on 2017/3/9.
 */

import * as axios from 'axios';
import {default as md5} from 'blueimp-md5';
import * as mCommon from 'com.cmcm.cloud';
require('es6-promise').polyfill();

let mCommonData = {};

let mAuthKey = '';

const mAxiosInstance = axios.create({
    baseURL: mCommon.util.getWscApi(),
    timeout: 20000
});

mAxiosInstance.interceptors.request.use(function (config) {
    config.data = config.data || {};
    config.data.cmuid = config.data.cmuid || mCommonData.cmuid;
    config.data.xaid = config.data.xaid || mCommonData.xaid;
    config.data.tstamp = config.data.tstamp || mCommonData.tstamp;
    config.data.mcc = config.data.mcc || mCommonData.mcc;
    config.headers['Authorization'] = md5(JSON.stringify(config.data), mAuthKey);
    return config;
});

export function getAxiosInstance(authKey, commonData) {
    if (authKey) {
        mAuthKey = authKey;
    }
    if (commonData) {
        mCommonData = {
            cmuid: commonData.cmuid || '',
            xaid: commonData.xaid || '',
            tstamp: commonData.tstamp || '',
            mcc: commonData.mcc || ''
        };
    }
    return mAxiosInstance;
}

export const URL_PATH = {
    GAME_CENTER: '/game/center'
};
