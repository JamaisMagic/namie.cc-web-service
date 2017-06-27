import '../style/common.styl';
import '../style/index.styl';
import Vue from 'vue';
import Vuetify from 'vuetify';
import { default as mCommon} from 'cc.namie.jamais';

import {getAxiosInstance} from './modules/request';
import {URL_PATH} from './modules/request';

import GhIcon from 'cc.namie.jamais/src/component/ghIcon/GhIcon';

const mAxios = getAxiosInstance();

Vue.use(Vuetify);

new Vue({
    el: '#vue_app',
    data() {
        return {
            is_requesting: true,
            url: '',
            res_url: ''
        };
    },
    created() {

    },
    mounted() {
        this.is_requesting = false;
    },
    components: {
        GhIcon
    },
    methods: {
        onSubmit() {
            this.shorten(this.url);
        },
        shorten(url) {
            const self = this;
            this.is_requesting = true;
            mAxios.post(mCommon.util.getNamieApi(URL_PATH.SHORTEN), {url})
                .then(res => res.data || {})
                .then(data => {
                    this.is_requesting = false;
                    if (data.code === 0) {
                        self.res_url = data.data.url;
                        return;
                    }
                    alert(`${data.code} : ${data.msg}`);
                })
                .catch(err => {
                    this.is_requesting = false;
                    console.log(err);
                    alert(err);
                })
        }
    }
});
