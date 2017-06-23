import 'cc.namie.jamais.m/src/style/common/common.styl';
import '../style/common.styl';
import '../style/index.styl';
import Vue from 'vue';
import Vuetify from 'vuetify';
import { default as mCommon} from 'cc.namie.jamais';
import GhIcon from 'cc.namie.jamais/src/component/ghIcon/GhIcon';

Vue.use(Vuetify);

new Vue({
    el: '#app',
    data() {
        return {
            is_requesting: true
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

    }
});
