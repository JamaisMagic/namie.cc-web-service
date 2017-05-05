<template>
    <header v-bind:class="skin">
        <div class="top-bar">
            <a href="javascript://" class="back-btn" v-on:click="onBackClick"></a>
            <h2 class="title" v-html="title"></h2>
        </div>
    </header>
</template>
<script>
    const mBridgeModule = require('com.cmcm.cloud/src/whatscallBridge.js');
    const mBridge = mBridgeModule();

    export default {
        name: 'normal-header',
        props: {
            title: String,
            prevent: {
                type: Boolean,
                default: false
            },
            finish: {
                type: Boolean,
                default: false
            },
            skin: {
                type: String,
                default: ''
            }
        },
        data() {
            return {

            }
        },
        methods: {
            onBackClick() {
                this.$emit('backclick');
                if (!(this.prevent === true)) {
                    if (this.finish === true) {
                        mBridge.jsBridge.finishActivity();
                    } else {
                        window.history.back();
                    }
                }
            }
        }
    }
</script>
<style lang="stylus" scoped>
    header {
        position fixed
        top 0
        left 0
        width 100%
        text-align center
        top-bar=48px
        z-index 100
        .top-bar {
            height top-bar
            box-sizing border-box
            background-color #46a4f4
            .back-btn {
                position absolute
                left 0
                top 0
                width 30px
                height 100%
                background url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwBAMAAAClLOS0AAAAElBMVEUAAAD///////////////////8+Uq06AAAABXRSTlMAgPE2d9xJ3IcAAAA6SURBVDjLYxiGgFEAh4RoIA4NoaEC2DWEBhng0KA8EjWgAIQGEiUwjcKwnLBzR54WB0KJGjMbDD8AAN5lKclhs+ROAAAAAElFTkSuQmCC") center center no-repeat
                background-size 24px 24px
                z-index 1
            }
            .title {
                box-sizing border-box
                position absolute
                width 100%
                left 0
                top 0
                height 100%
                line-height top-bar
                padding 0 48px
                overflow ellipsis
                font-size 20px
                color #ffffff
                z-index 0
            }
        }
        &.skin-white {

        }
    }
</style>
