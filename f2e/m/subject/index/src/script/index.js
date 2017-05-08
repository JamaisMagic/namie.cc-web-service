import '../style/common.styl';
import '../style/index.styl';
import Vue from 'vue';

import {getAxiosInstance} from './modules/request';
import {URL_PATH} from './modules/request';

const mAxios = getAxiosInstance();

new Vue({
    el: '#app',
    data() {
        return {
            url: 'https://google.com?search=666',
            res_url: ''
        };
    },
    created() {

    },
    methods: {
        onSubmit() {
            this.shorten(this.url);
        },
        shorten(url) {
            const self = this;
            mAxios.post(URL_PATH.SHORTEN, {url})
                .then(res => res.data || {})
                .then(data => {
                    if (data.code === 0) {
                        self.res_url = data.data.url;
                        return;
                    }
                    alert(`${data.code} : ${data.msg}`);
                })
                .catch(err => {
                    console.log(err);
                    alert(err);
                })
        }
    }
});
