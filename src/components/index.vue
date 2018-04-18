<template>
  <div class="main-container">

    <!-- desktop icon -->
    <div class="icons-container">
      <div class="icon"></div>
      <p @click="openBrowser('p')">open</p>
    </div>
    
    <!-- browser windows -->
    <browser :browserClass="browserClass" @change="applyChange" view="portfolio" tab="p" />

    <!-- start menu -->
    <div class="menubar">
      <div class="start" @click="toggleNavigation">
        <p>Start</p>
      </div>
      
      <!-- tabs -->
      <tabsbar :tabs="tabs" @change="applyChange" />

    </div>

    <div class="menu" v-if="showNavigation">
      <div class="menuTab">
        <div class="iconPlaceholder"></div>
        <div class="label">open</div>
      </div>
    </div>

  </div>
</template>

<script>
  import interact from 'interactjs'
  import browser from './browser'
  import tabsbar from './tabsbar'

  export default {
    data() {
      return {
        browserClass: {
          'hidden': true,
          'browser--fullscreen': false
        },
        showNavigation: false,
        tabs: ['1', '2', '$', '#']
      }
    },
    computed: {
      fullscreenIcon() {
        return this.browserClass['browser--fullscreen'] ? '-' : '+'
      }
    },
    methods: {
      applyChange (callback, args) {
        this[callback].apply(null, args)
      },
      openBrowser(openTab) {
        this.browserClass.hidden = false
        if (this.tabs.indexOf(openTab) === -1 && openTab) {
          this.tabs.push(openTab)
        }
      },
      closeBrowser(closedTab) {
        closedTab = closedTab || ''
        this.browserClass.hidden = true
        this.tabs = this.tabs.filter((item) => {
          return item !== closedTab
        })
      },
      minimizeBrowser () {
        this.browserClass.hidden = true
      },
      toggleFullscreenBrowser() {
        this.browserClass['browser--fullscreen'] = !this.browserClass['browser--fullscreen']
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
      tabsbar
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
  }

  .start {
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

  .menu {
    position: absolute;
    width: 200px; // height: calc(100% - 60px);
    bottom: 0;
    left: 0;
    margin-left: 18px;
    margin-bottom: 60px;
    background: rgba(255, 0, 0, 0.75);

    .menuTab {
      position: relative;
      width: 100%;
      height: 60px;
      color: white;
      background: rgba(255, 255, 255, 0.5);
      cursor: pointer;
      overflow: hidden;
      .label {
        position: relative;
        height: 24px;
        top: 50%;
        transform: translateY(-50%);
        margin-left: 60px;
      }
      .iconPlaceholder {
        position: absolute;
        width: 36px;
        height: 36px;
        top: 50%;
        left: 0;
        transform: translateY(-50%);
        margin-left: 12px;
        background: rgba(255, 0, 0, 0.15);
      }
    }

  }


  .hidden {
    opacity: 0;
    pointer-events: none;
  }

</style>
