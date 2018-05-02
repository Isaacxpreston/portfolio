<template>
  <!-- browser -->
  <div class="browser" :class="[browserData.classes]" @click="emit('bringToFront', [browserData.template])">
    <div class="topbar">
      <div class="topbar__label">{{browserData.tabData.label}}</div>
      <div class="topbar__icon topbar__icon--minimize" @click="emit('minimizeBrowser', [browserData.template])">
        <span>m</span>
        <itemLabel>minimize</itemLabel>
      </div>
      <div class="topbar__icon topbar__icon--fullscreen" @click="emit('toggleFullscreenBrowser', [browserData.template])">
        <span>{{fullscreenIcon}}</span>
        <itemLabel>fullscreen</itemLabel>
      </div>
      <div class="topbar__icon topbar__icon--close" @click="emit('closeBrowser', [browserData.template])">
        <span>X</span>
        <itemLabel>close</itemLabel>
      </div>
    </div>
    <div class="browser__content">
      
      <!-- browser content from props -->
      <navigation v-if="browserData.children" :data="browserData.children" :parentTemplate="browserData.name" @change="emit" />

      <div class="browser__content-inner" :class="browserContentClass">
        <!-- todo: make responsive to navigation -->
        <component :is="browserData.currentTemplate.template" :content="browserData.currentTemplate.content" />
      </div>

    </div>
  </div>
</template>


<script>
  import interact from 'interactjs'
  import portfolio from './portfolio'
  import navigation from './navigation'
  import about from './about'
  import itemLabel from './itemLabel'
  import emit from './mixins/emit'
  import applyChange from './mixins/applyChange'

  export default {
    props: ['browserData'],
    mixins: [emit, applyChange],
    computed: {
      fullscreenIcon() {
        return this.browserData['browser--fullscreen'] ? '-' : '+'
      },
      browserContentClass () {
        return this.browserData['children'] ? 'browser__content-inner--navigation-visible' : ''
      }
    },
    components: {
      navigation,
      portfolio,
      about,
      itemLabel
    }
  }

</script>

<style scoped lang='scss'>
  @import '../assets/scss/breakpoints';

  .browser {
    position: absolute;
    top: 0;
    left: 0;
    width: 850px;
    height: 500px;
    background: white; // cursor: pointer;
    box-sizing: border-box;
    border: 12px solid rgba(255, 0, 0, 0.5);
    max-width: 100%;
    max-height: 100%;
    z-index: 1;
    &--fullscreen {
      width: 100% !important;
      height: 100% !important;
      transform: none !important;
      transition: width 0.4s ease, height 0.4s ease, transform 0.4s ease;
    }
    &--top {
      z-index: 2;
    }
    @media screen and (max-width: $mobile-max) {
      // todo: find a better way to write this
      width: 100% !important;
      height: 100% !important;
      transform: none !important;
      transition: width 0.4s ease, height 0.4s ease, transform 0.4s ease;
    }
  }

  .browser__content {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: calc(100% - 48px);
    margin-top: 48px;
    overflow: scroll;
    background: white;
  }

  .browser__content-inner {
    position: absolute;
    top: 0;
    right: 0;
    width: 100%;
    height: 100%;
    background: rgba(255, 0, 0, 0.15);
    &--navigation-visible {
      width: calc(100% - 200px);
      margin-left: 200px;
      @media screen and (max-width: $mobile-max) {
        width: 100%;
        margin-left: 0px;
      }
    }
  }

  .topbar {
    position: absolute;
    height: 48px;
    width: 100%;
    top: 0;
    left: 0;
    background: rgba(255, 0, 0, 0.75);
  }

  .topbar__icon {
    position: absolute;
    top: 0;
    right: 0;
    width: 24px;
    height: 24px;
    background: rgba(255, 0, 0, 0.75);
    margin-top: 12px;
    cursor: pointer;
    color: white;
    text-align: center;
    user-select: none;
    &--minimize {
      margin-right: 84px;
      @media screen and (max-width: $mobile-max) {
        display: none;
      }
    }
    &--fullscreen {
      margin-right: 48px;
      @media screen and (max-width: $mobile-max) {
        display: none;
      }
    }
    &--close {
      margin-right: 12px;
    }
    &:hover {
      .item-label {
        opacity: 1;
        transition-delay: 0.2s;
        transform: translate(-50%, -50px) scale(1);
      }
    }
  }


  .hidden {
    opacity: 0;
    pointer-events: none;
  }

</style>
