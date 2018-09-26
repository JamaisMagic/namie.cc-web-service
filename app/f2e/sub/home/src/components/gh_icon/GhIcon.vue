<template>
    <a v-bind:title="title" href="https://github.com/JamaisMagic/www.namie.cc" rel="nofollow noreferrer" target="_blank">
        <img v-bind:src="light ? mghImg120Light : mghImg120" v-bind:width="size">
    </a>
</template>
<script>
    import mghImg120 from './GitHub-Mark-120px-plus.png';
    import mghImg120Light from './GitHub-Mark-Light-120px-plus.png';


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
        data() {
            return {
                mghImg120,
                mghImg120Light,
            }
        },
    }
</script>
