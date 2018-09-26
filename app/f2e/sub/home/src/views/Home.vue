<template>
    <div class="page-home">
        <div class="text-xs-center">
            Please enter your url and click the submit button.
        </div>

        <form v-on:submit.prevent="onSubmit">
            <v-text-field autofocus type="url" v-model="longUrl" placeholder="Url here."></v-text-field>
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
        </v-card>
    </div>
</template>

<script>
    import {shorten} from '../utils/request';


    export default {
        name: 'home',
        data() {
            return {
                longUrl: '',
                isRequesting: false,
                shortUrl: ''
            };
        },
        components: {

        },
        methods: {
            async onSubmit() {
                this.isRequesting = true;
                let response = await shorten(this.longUrl);
                this.isRequesting = false;

                let data = response.data || {};
                if (data.code === 0) {
                    return this.shortUrl = data.data.url;
                }

                alert('error');
            }
        }
    }
</script>
