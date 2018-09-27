import 'material-design-icons-iconfont/dist/material-design-icons.css';
import 'vuetify/src/stylus/app.styl';
import Vue from 'vue';
import Vuetify from 'vuetify/es5/components/Vuetify';
import VApp from 'vuetify/es5/components/VApp';
import VToolbar from 'vuetify/es5/components/VToolbar';
import VTextField from 'vuetify/es5/components/VTextField';
import VBtn from 'vuetify/es5/components/VBtn';
import VAlert from 'vuetify/es5/components/VAlert';
import VSnackbar from 'vuetify/es5/components/VSnackbar';
import * as VCard from 'vuetify/es5/components/VCard';
import * as VGrid from 'vuetify/es5/components/VGrid';

import App from './App.vue';
import router from './router';
import store from './store';
import './registerServiceWorker';


Vue.config.productionTip = false;
Vue.use(Vuetify, {
    components: {
        VApp,
        VToolbar,
        VTextField,
        VBtn,
        VAlert,
        VSnackbar,
        ...VCard,
        ...VGrid
    }
});

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app');
