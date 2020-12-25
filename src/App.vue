<template>
  <div 
    :class="$route.meta.status && 'error'"
    id="app"
  >
    <ViewAlertbox />
    <template
      v-if="$route.meta.status == '404'"
    >
      <ViewUnderheader />
      <ViewHeader :className="$route.meta.headerClean && 'view-header--clear'" />
      <Error404 />
    </template>
    <template
      v-else
    >
      <template v-if="!$route.meta.hideCommon">
        <ViewPreloader :loaded="state.loaded" v-if="showPreloader" :fullpage="true" :items="state.items"></ViewPreloader>
        <ViewUnderheader />
        <ViewHeader :className="$route.meta.headerClean && 'view-header--clear'" />
      </template>
      <router-view 
        @initPreloader="initPreloader()" 
        @hidePreloader="showPreloader = false" 
        @updateLoaderState="updateLoaderState" 
      />
      <ViewFooter 
        v-if="!$route.meta.hideCommon" 
      />
    </template>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
import ViewAlertbox from '@/components/ViewAlertbox/ViewAlertbox';
import Error404 from '@/components/ViewError/404';
import ViewPreloader from '@/components/ViewPreloader/ViewPreloader'
import ViewUnderheader from './components/ViewUnderheader/ViewUnderheader';
import ViewHeader from './components/ViewHeader/ViewHeader';
import ViewFooter from './components/ViewFooter/ViewFooter';

export default {
  name: 'App',
  data() {
    return {
      showPreloader: false,
      state: {
        loaded: 0,
        items: 0
      }
    }
  },
  components: {
    ViewPreloader,
    ViewUnderheader,
    ViewHeader,
    ViewFooter,
    Error404,
    ViewAlertbox
  },
  methods: {
    ...mapActions(['checkToken']),

    updateLoaderState(state) {
      this.state.items = state.items
      this.state.loaded = state.loaded
    },

    initPreloader(){
      this.showPreloader = true
    },

    checkVersion() {
      const root = document.documentElement;

      if (localStorage.getItem('bodyStyle') == 'zoomed') {
          document.body.classList.add('is-visual');

          root.style.setProperty('--text-color-blue', '#004784');
          root.style.setProperty('--text-color-gray', '#464646');
          root.style.setProperty('--text-color-light-gray', '#555');
          root.style.setProperty('--text-color-orange', '#0B2239');
          root.style.setProperty('--text-color-red', '#af0000');
      }
    }
  },
  created() {
    this.checkToken();
    this.checkVersion();
  },
  updated() {
    this.checkToken();
  },
}
</script>

<style lang="scss">
  @import './scss/style.scss';
</style>