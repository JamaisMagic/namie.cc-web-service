import '../style/common.styl';
import '../style/main.styl';
import Vue from 'vue';
import {getAxiosInstance, URL_PATH} from './modules/request';
import {default as mTest} from './modules/test';
import {gameCenterHelper as mGameCenterHelper } from './modules/gameCenterHelper';

import NormalHeader from './components/NormalHeader.vue';

const mBridgeModule = require('com.cmcm.cloud/src/whatscallBridge.js');
const mBridge = mBridgeModule();

let mAxios = null;

new Vue({
    el: '#app',
    data() {
        return {
            is_requesting: false,
            games: []
        }
    },
    components: {
        NormalHeader
    },
    created() {
        const _self = this;

        mBridge.register(mBridge.CONSTANCES.API_NAME_GET_USER_INFO, (data) => {
            mAxios = getAxiosInstance(data.data.token_tmp, {
                cmuid: data.data.cmuid || '',
                xaid: data.data.xaid || '',
                tstamp: data.data.tstamp || '',
                mcc: data.data.mcc || ''
            });

            _self.getGames();
        });

        mBridge.jsBridge.getUserInfo();
        mTest();
    },
    mounted() {

    },
    methods: {
        getGames() {
            const _self = this;
            this.is_requesting = true;
            mAxios.post(URL_PATH.GAME_CENTER)
                .then(res => {
                    _self.is_requesting = false;
                    let data = res.data;
                    if (data.error === 0) {
                        _self.games = data.game;
                    } else {
                        mGameCenterHelper.handleServerError(data.error);
                    }
                })
                .catch(error => {
                    console.log(error);
                    _self.is_requesting = false;
                    mGameCenterHelper.handleCatchError(error);
                })
        }
    }
});
