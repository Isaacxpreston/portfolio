<template>
  <div class="main-container">

    <!-- desktop icon -->
    <div class="icons-container">
      <div class="icon"></div>
      <p v-on:click="openBrowser">Open</p>
    </div>

    <browser :browserClass="browserClass" @change="applyChange" />

    <!-- start menu -->
    <div class="menubar">
      <div class="start" @click="toggleNavigation">
        <p>Start</p>
      </div>
    </div>

    <div class="menu" v-if="showNavigation">
      <div class="menuTab">
        <div class="iconPlaceholder"></div>
        <div class="label">Open Window</div>
      </div>
      <div class="menuTab">
        <div class="iconPlaceholder"></div>
        <div class="label">Open Window</div>
      </div>
      <div class="menuTab">
        <div class="iconPlaceholder"></div>
        <div class="label">Open Window</div>
      </div>
      <div class="menuTab">
        <div class="iconPlaceholder"></div>
        <div class="label">Open Window</div>
      </div>
      <div class="menuTab">
        <div class="iconPlaceholder"></div>
        <div class="label">Open Window</div>
      </div>
    </div>

  </div>
</template>

<script>
  import interact from 'interactjs'
  // import portfolio from './portfolio'
  import browser from './browser'

  export default {
    name: 'HelloWorld',
    data() {
      return {
        browserClass: {
          'hidden': true,
          'browser--fullscreen': false
        },
        showNavigation: false
      }
    },
    computed: {
      fullscreenIcon() {
        return this.browserClass['browser--fullscreen'] ? '-' : '+'
      }
    },
    methods: {
      applyChange (callback) {
        callback(this)
      },
      openBrowser() {
        this.browserClass.hidden = false
      },
      closeBrowser() {
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
      // portfolio,
      browser
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

  // .browser {
  //   position: absolute;
  //   top: 0;
  //   left: 0;
  //   width: 850px;
  //   height: 500px;
  //   background: white; // cursor: pointer;
  //   box-sizing: border-box;
  //   border: 12px solid rgba(255, 0, 0, 0.5);
  //   max-width: 100%;
  //   max-height: 100%;
  //   &--fullscreen,
  //     {
  //     width: 100% !important;
  //     height: 100% !important;
  //     transform: none !important;
  //     transition: width 0.4s ease, height 0.4s ease, transform 0.4s ease;
  //   }
  //   @media screen and (max-width: 767px) {
  //     // todo: find a better way to write this
  //     width: 100% !important;
  //     height: 100% !important;
  //     transform: none !important;
  //     transition: width 0.4s ease, height 0.4s ease, transform 0.4s ease;
  //   }
  // }



  // .content {
  //   position: absolute;
  //   top: 0;
  //   left: 0;
  //   width: 100%;
  //   height: calc(100% - 48px);
  //   margin-top: 48px;
  //   overflow: scroll;
  //   background: white;
  // }

  // .banner {
  //   position: absolute;
  //   height: 48px;
  //   width: 100%;
  //   top: 0;
  //   left: 0;
  //   background: rgba(255, 0, 0, 0.75);
  // }

  // .banner__icon {
  //   position: absolute;
  //   top: 0;
  //   right: 0;
  //   width: 24px;
  //   height: 24px;
  //   background: rgba(255, 0, 0, 0.75);
  //   margin-top: 12px;
  //   cursor: pointer;
  //   color: white;
  //   text-align: center;
  //   user-select: none;
  //   &--minimize {
  //     margin-right: 84px;
  //   }
  //   &--close {
  //     margin-right: 12px;
  //   }
  //   &--fullscreen {
  //     margin-right: 48px;
  //     @media screen and (max-width: 767px) {
  //       display: none;
  //     }
  //   }
  // }



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
    p {
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
      background: rgba(255, 255, 255, 0.25);
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
        background: white;
      }
    }

  }


  .hidden {
    opacity: 0;
    pointer-events: none;
  }

</style>
