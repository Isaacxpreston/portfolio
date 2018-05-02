<template>
  <div class="main-container">

    <!-- desktop icons -->
    <div class="icons-container" v-for="(browser, index) in browsers" :key="'icons-' + index">
      <div class="icon"></div>
      <p @click="openBrowser(browser['template'])">{{browser['tabData']['label']}}</p>
    </div>

    <!-- browser windows -->
    <browser v-for="(browser, index) in browsers" :key="'browsers-' + index" :browserData="browser" @change="applyChange" />

    <!-- start menu -->
    <div class="menubar">

      <!-- start button -->
      <div class="menubar__start" @click="toggleNavigation">
        <p>Start</p>
      </div>

      <!-- browser tabs -->
      <tabsbar :browserData="browsers" @change="applyChange" />

      <!-- menu navigation -->
      <menuNav @change="applyChange" :browserData="browsers" v-if="showNavigation" />

    </div>

  </div>
</template>

<script>
  // components
  import browser from './browser'
  import tabsbar from './tabsbar'
  import menuNav from './menuNav'

  // js
  // import browsers from '../assets/js/browsers'
  import initInteract from '../assets/js/interact'

  // mixins
  import applyChange from './mixins/applyChange'

  export default {
    mixins: [applyChange],
    data() {
      return {
        // all browser data
        // browsers,
        // menuNav bool
        // showNavigation: false,
      }
    },
    computed: {
      showNavigation () {
        return this.$store.state.showNavigation
      },
      browsers () {
        return this.$store.state.browsers
      }
    },
    methods: {

      //
      // browser methods //
      //
      // todo: move all to vuex store as mutations
      // todo: move to component originally called in instead of parent, eliminate emits + emit method

      openBrowser(browserTemplate, tabNavigatedTo) {
        // dispatch bring to front + openbrowser
        // could also be written as two commits
        this.$store.dispatch('openBrowser', browserTemplate, tabNavigatedTo)
      },
      closeBrowser(browserTemplate) {
        // hide browser and close tab
        // again, could also be written as an action
        this.$store.commit('minimizeBrowser', browserTemplate)
        this.$store.commit('closeBrowser', browserTemplate)
      },
      minimizeBrowser(browserTemplate) {
        this.$store.commit('minimizeBrowser', browserTemplate)
      },
      bringToFront(browserTemplate) {
        this.$store.commit('bringToFront', browserTemplate)
      },
      toggleFullscreenBrowser(browserTemplate) {
        this.$store.commit('toggleFullscreenBrowser', browserTemplate)
      },
      changeCurrentTemplate(browserTemplate, data) {
        this.$store.commit('changeCurrentTemplate', {browserTemplate, data})
      },

      //
      // end browser methods //
      //

      toggleNavigation() {
        // toggle menuNav display
        // this.showNavigation = !this.showNavigation ? true : false

        // todo: store.toggleNavigation
        this.$store.commit('toggleNavigation')
      }
    },
    mounted() {

      // interactJs

      initInteract()

      // resize / reposition elements on window resize

      window.addEventListener('resize', () => {

        let elOffsetX = parseInt(document.querySelector('.browser').getAttribute('data-x')) || 0
        let elOffsetY = parseInt(document.querySelector('.browser').getAttribute('data-y')) || 0
        let elWidth = parseInt(window.getComputedStyle(document.querySelector('.browser'))['width'].replace(
          'px', ''))
        let elCombinedX = elOffsetX + elWidth

        let containerWidth = parseInt(window.getComputedStyle(document.querySelector('.main-container'))['width']
          .replace('px', ''))


        if (elCombinedX > containerWidth) {
          let newOffsetX = (containerWidth - elWidth) // - 24 // ?? not sure why I need 10px here.
          document.querySelector('.browser').style.transform = 'translate(' + newOffsetX + 'px, ' + elOffsetY +
            'px)'
          document.querySelector('.browser').setAttribute('data-x', newOffsetX)
        }

      })


    },
    components: {
      browser,
      tabsbar,
      menuNav
    }
  }

</script>

<style lang="scss">
  // global styles
  h1,
  h2,
  h3,
  h4,
  p,
  a {
    margin: 0px;
    font-weight: 400;
  }

</style>

<style scoped lang='scss'>
  @import '../assets/scss/breakpoints';

  .vertical-center {
    position: relative;
    top: 50%;
    transform: translateY(-50%);
  }

  .main-container {
    position: absolute;
    box-sizing: border-box;
    border: 5px solid rgba(255, 0, 0, 0.5);
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    margin: auto;
    height: 100%;
    width: 100%; // width: 1200px;
    // height: 600px;
    max-width: 100vw;
    max-height: 100vh;
    background: rgba(255, 0, 0, 0.15);
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale; // todo: make an auto height rule for short screens/mobile
  }

  .icons-container {
    position: relative;
    display: inline-block;
    padding: 24px;
    text-align: center;
    color: white;
    p {
      cursor: pointer;
      background: rgba(255, 0, 0, 0.15);
      user-select: none;
    }
  }

  .icon {
    position: relative;
    width: 90px;
    height: 90px;
    background: rgba(255, 0, 0, 0.75);
    cursor: pointer;
  }

  .menubar {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 60px;
    background: rgba(255, 0, 0, 0.15);
    z-index: 3;
  }

  .menubar__start {
    position: absolute;
    top: 0;
    left: 0;
    height: 36px;
    width: 200px;
    text-align: center;
    color: white;
    background: rgba(255, 0, 0, 0.5);
    margin-top: 12px;
    margin-left: 18px;
    cursor: pointer;
    user-select: none;
    >p {
      position: absolute;
      top: 0;
      left: 0;
      bottom: 0;
      right: 0;
      margin: auto;
      height: 24px;
    }
    @media screen and (max-width: $mobile-max) {
      width: calc(100% - 36px);
    }
  }

  .hidden {
    opacity: 0;
    pointer-events: none;
  }

</style>
