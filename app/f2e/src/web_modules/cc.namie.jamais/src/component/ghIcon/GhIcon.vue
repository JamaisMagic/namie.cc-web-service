<template>
    <a v-bind:title="title" href="https://github.com/JamaisMagic/namie.cc" target="_blank">
        <img v-bind:src="light ? mghImg120Light : mghImg120" v-bind:width="size">
    </a>
</template>
<script>
    const mghImg120 = require('./GitHub-Mark-120px-plus.png');
    const mghImg120Light = require('./GitHub-Mark-Light-120px-plus.png');
    export default {
        name: 'gh-icon',
        props: {
            size: {
                type: Number,
                default: 32
            },
            light: {
                type: Boolean,
                default: false
            },
            title: {
                type: String,
                default: 'Fork me on Github'
            }
        },
        created() {

        },
        data() {
            return {
                mghImg120,
                mghImg120Light,
            }
        },
        methods: {

        }
    }
</script>
<style lang="stylus" scoped>

</style>
