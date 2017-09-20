import 'cc.namie.jamais.m/src/style/common/common.styl';
import '../style/common.styl';
import '../style/index.styl';
import Vue from 'vue';
import Vuetify from 'vuetify';
import {default as mCommon} from 'cc.namie.jamais';
import GhIcon from 'cc.namie.jamais/src/component/ghIcon/GhIcon';

Vue.use(Vuetify);

let evtS = null;

new Vue({
    el: '#app',
    data() {
        return {
            is_requesting: true,
            message_list: []
        };
    },
    created() {

    },
    mounted() {
        this.is_requesting = false;
        this.initEventSource();
    },
    components: {
        GhIcon
    },
    methods: {
        initEventSource() {
            const self = this;
            evtS = new EventSource(mCommon.util.getNamieApi('/api/sse/demon/interval/'));

            evtS.addEventListener('message', evt => self.handleData(evt), false);
            evtS.addEventListener('pyevent', evt => self.handleData(evt), false);
            evtS.addEventListener('error', evt => {
                console.log(evt);
                if (evt.target.readyState === EventSource.CLOSED) {
                    console.log('connection closed.');
                }
            }, false);
        },
        handleData(event) {
            console.log(event);
            let jsonStr = event.data;
            let obj = {};
            try {
                obj = JSON.parse(jsonStr);
            } catch (err) {
                obj.error = -1;
                obj.message = jsonStr;
            }
            this.message_list = [...this.message_list, {
                error: obj.error,
                message: obj.message,
                event_type: event.type
            }];
        },
        close() {
            evtS && evtS.close();
        }
    }
});
