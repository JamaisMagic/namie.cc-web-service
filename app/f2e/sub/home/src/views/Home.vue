<template>
    <div class="page-home">
        <div class="text-xs-center">
            Please enter an url and click the submit button.
        </div>

        <form v-on:submit.prevent="onSubmit">
            <v-text-field autofocus type="url" :placeholder="'Example: ' + urlExample"
                          v-model.trim="longUrl" v-on:invalid.prevent="onUrlInvalid"></v-text-field>
            <div class="text-xs-center">
                <v-btn round large color="info" type="submit" v-bind:loading="isRequesting">Submit to shorten</v-btn>
            </div>
        </form>

        <v-card flat v-if="shortUrl">
            <v-card-text class="text-xs-center">
                Short url is here:
            </v-card-text>
            <v-card-text class="text-xs-center">
                <a class="blue--text" target="_blank" v-bind:href="shortUrl" v-text="shortUrl"></a>
            </v-card-text>

            <v-layout align-center justify-center row>
                <v-flex xs12 text-xs-center>
                    <v-btn small color="info" v-on:click="onCopyClick">Click to copy</v-btn>
                </v-flex>
            </v-layout>
        </v-card>

        <v-list subheader>
          <v-subheader>For security reason, this service only support the following hostnames.</v-subheader>
          <template v-for="(item) in urlWhiteList">
            <v-list-tile
              @click=""
            >
              <v-list-tile-content>
                <v-list-tile-sub-title>{{ item }}</v-list-tile-sub-title>
              </v-list-tile-content>
            </v-list-tile>
          </template>
        </v-list>
        
    </div>
</template>

<script>
    import isJs from 'is_js';
    import { shorten, getHostnameWhiteList} from '../utils/request';

    export default {
        name: 'home',
        data() {
            return {
                longUrl: '',
                isRequesting: false,
                shortUrl: '',
                urlWhiteList: [],
                urlExample: 'https://www.google.com/',
            };
        },
        components: {

        },
        mounted() {
            this.getHostnameWhiteList();
        },
        methods: {
            async getHostnameWhiteList() {
                const response = await getHostnameWhiteList();
                if (response && response.status === 200 && response.data.code === 0) {
                    this.urlWhiteList = response.data.data.hostname_list || [];
                }
            },
            async onSubmit() {
                if (!this.longUrl) {
                    this.longUrl = this.urlExample;
                }

                if (!this.longUrl || !isJs.url(this.longUrl)) {
                    this.emitToast('Please enter an URL.');
                    return;
                }

                this.isRequesting = true;
                let response = await shorten(this.longUrl);
                this.isRequesting = false;

                let data = response.data || {};
                if (data.code === 0) {
                    return this.shortUrl = data.data.url;
                }

                this.emitToast('There is something wrong, please try again later.');
            },
            onUrlInvalid(event) {
                this.emitToast('Please enter an URL.');
            },
            emitToast(text) {
                this.$emit('showAlert', text);
            },
            onCopyClick() {
                if (!this.shortUrl) {
                    return;
                }
                if (window.navigator.clipboard) {
                    window.navigator.clipboard.writeText(this.shortUrl)
                        .then(() => {
                            this.emitToast('Copied.');
                        })
                        .catch(err => {
                            this.emitToast('There is something wrong, please copy the url manually.');
                        });
                    return;
                }
                this.emitToast('Your browser does not support clipboard api, please copy the url manually.');
            }
        }
    }
</script>
