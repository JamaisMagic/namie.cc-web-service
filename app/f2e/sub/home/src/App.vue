<template>
  <v-app>
      <v-toolbar app class="blue" light v-bind:fixed="true">
        <v-toolbar-side-icon light></v-toolbar-side-icon>
        <v-toolbar-title class="white--text">www.namie.cc</v-toolbar-title>
        <v-spacer></v-spacer>

        <v-toolbar-items>

        </v-toolbar-items>
        <GhIcon light />
      </v-toolbar>

      <v-content>
        <v-container fluid>
          <router-view/>
        </v-container>
      </v-content>
    </v-app>
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

<script>
  export default {
      name: 'App',
      components: {
          GhIcon: () => import('./components/gh_icon/GhIcon')
      }
  }
</script>
