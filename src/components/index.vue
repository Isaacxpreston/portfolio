<template>
  <div class="main-container">

    <!-- desktop icon -->
    <!-- todo: iterate over data -->
    <div class="icons-container">
      <div class="icon"></div>
      <p @click="openBrowser('portfolio')">open p</p>
    </div>

    <div class="icons-container">
      <div class="icon"></div>
      <p @click="openBrowser('about')">open a</p>
    </div>

    <!-- browser windows -->
    <browser v-for="(browser, index) in browsers" :key="index" :browserClass="browser" :view="browser['template']" :tab="browser['tab']" @change="applyChange" />

    <!-- start menu -->
    <div class="menubar">

      <!-- start button -->
      <div class="menubar__start" @click="toggleNavigation">
        <p>Start</p>
      </div>

      <!-- browser tabs -->
      <tabsbar :tabs="tabs" @change="applyChange" />

      <!-- menu navigation -->
      <!-- todo: iterate over data also! -->
      <menuNav :showNavigation="showNavigation" />

    </div>

  </div>
</template>

<script>
  import interact from 'interactjs'
  import browser from './browser'
  import tabsbar from './tabsbar'
  import menuNav from './menuNav'
  import browsers from '../assets/js/browsers'

  export default {
    data() {
      return {
        browsers,
        showNavigation: false,
        tabs: []
      }
    },
    computed: {
    },
    methods: {
      applyChange(callback, args) {
        this[callback].apply(null, args)
      },
      openBrowser(browserTemplate) {

        // return if does not exist
        if (!this.browsers[browserTemplate]) return

        // show browser
        console.log('opening', browserTemplate)
        this.browsers[browserTemplate].hidden = false

        // add to tabs bar if not already open
        let alreadyOpen = false
        let tabData = this.browsers[browserTemplate]['tabData']

        for (let i = 0; i < this.tabs.length; i++) {
          if (this.tabs[i].template === browserTemplate) {
            alreadyOpen = true
          }
        }
        if (!alreadyOpen) {

          this.tabs.push({
            template: browserTemplate,
            ...tabData
          })
        }

        // bring browser to front on open
        this.bringToFront(browserTemplate)
      },
      closeBrowser(browserTemplate) {
        // hide browser and remove from tabs array
        console.log('closing', browserTemplate)

        // call hide browser method
        this.minimizeBrowser(browserTemplate)

        // remove from tabs array
        this.tabs = this.tabs.filter((item) => {
          return item.template !== browserTemplate
        })
      },
      minimizeBrowser(browserTemplate) {
        // hide browser without removing from tabs array
        console.log('minimizing', browserTemplate)
        this.browsers[browserTemplate].hidden = true
      },
      bringToFront(browserTemplate) {
        // add z-index class to browser on click or open
        console.log('bringing to front', browserTemplate)
        // remove class from all templates first
        for (let key in this.browsers) {
          this.browsers[key]['browser--top'] = false
        }
        // add class
        this.browsers[browserTemplate]['browser--top'] = true
      },
      toggleFullscreenBrowser(openTab, browserTemplate) {
        // toggle fullscreen class
        this.browsers[browserTemplate]['browser--fullscreen'] = !this.browsers[browserTemplate]['browser--fullscreen']
      },
      toggleNavigation() {
        this.showNavigation = !this.showNavigation ? true : false
      }
    },
    mounted() {

      function dragMoveListener(event) {
        var target = event.target,
          // keep the dragged position in the data-x/data-y attributes
          x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx,
          y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy;
        // translate the element
        target.style.webkitTransform = target.style.transform = 'translate(' + x + 'px, ' + y + 'px)';
        // update the posiion attributes
        target.setAttribute('data-x', x);
        target.setAttribute('data-y', y);
      }

      interact('.icons-container')
        .draggable({
          allowFrom: '.icon',
          onmove: dragMoveListener,
          restrict: {
            restriction: 'parent',
            elementRect: {
              top: 0,
              left: 0,
              bottom: 1,
              right: 1
            }
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
  }

  .hidden {
    opacity: 0;
    pointer-events: none;
  }

</style>
