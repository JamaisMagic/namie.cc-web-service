<template>
    <div class="page-home">
        <div class="text-xs-center">
            Please enter your url and click the submit button.
        </div>

        <form v-on:submit.prevent="onSubmit">
            <v-text-field autofocus required type="url" placeholder="Url here."
                          v-model="longUrl" v-on:invalid.prevent="onUrlInvalid"></v-text-field>
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
                <v-flex xs1 text-xs-center>
                    <v-btn small color="info" v-on:click="onCopyClick">Click to copy</v-btn>
                </v-flex>
            </v-layout>
        </v-card>
    </div>
</template>

<script>
    import isJs from 'is_js';
    import {shorten} from '../utils/request';


    export default {
        name: 'home',
        data() {
            return {
                longUrl: '',
                isRequesting: false,
                shortUrl: '',
            };
        },
        components: {

        },
        methods: {
            async onSubmit() {
                if (!this.longUrl || !isJs.url(this.longUrl)) {
                    this.emitToast('Please enter a URL.');
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
                this.emitToast('Please enter a URL.');
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
