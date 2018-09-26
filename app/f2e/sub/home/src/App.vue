<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<style lang="scss">
  @import "~normalize-scss/sass/normalize";
  @include normalize();
  @import "./assets/style/util";
  @import "~vuetify/dist/vuetify.css";

  html, body {
    box-sizing: border-box;
    width: 100%;
    height: 100%;
    background: #ffffff;
    color: #000000;
    font-family: SFUIDisplay, "PingFang SC", Helvetica, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
    font-size: 16px;
  }

  a, button, input {
    -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
  }

  @media screen and(max-width: 750px) {
    body {
      font-size: px2rem(32px);
    }
  }
</style>
