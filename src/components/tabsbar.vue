<template>
  <!-- todo: add icon support -->
  <div class="tabsbar" v-if="tabs.length">
    <div v-for="(item, index) in tabs" :key="index" class="tabsbar__tab" @click="emit('openBrowser', [item.template])">
      <p>{{item.icon}}</p>

      <itemLabel>{{item.label}}</itemLabel>

    </div>
  </div>
</template>

<script>
  import emit from './mixins/emit'
  import itemLabel from './itemLabel'

  export default {
    props: ['browserData'],
    mixins: [emit],
    computed: {
      // only display tabs where open = true
      tabs () {
        let openTabs = []
        for (let key in this.browserData) {
          if(this.browserData[key]['tabData']['open']) {
            openTabs.push({
              template: this.browserData[key]['template'],
              ...this.browserData[key]['tabData']
            })
          }
        }
        return openTabs
      }
    },
    components: {
      itemLabel
    }
  }

</script>

<style scoped lang="scss">
  @import '../assets/scss/breakpoints';

  .tabsbar {
    position: relative;
    margin: auto;
    margin-top: 12px;
    display: flex;
    background: rgba(255, 0, 0, 0.25);
    justify-content: center;
    max-width: calc(100% - 472px);
    height: 36px;
    white-space: nowrap;
    @media screen and (max-width: $mobile-max) {
      display: none;
    }
  }


  .tabsbar__tab {
    position: relative;
    margin: 0px 6px;
    height: 36px;
    width: 36px;
    text-align: center;
    color: white;
    background: rgba(255, 0, 0, 0.5);
    cursor: pointer;
    transition: transform 0.2s ease-out;
    transition-delay: 0.1s;
    &:hover {
      transform: scale(1.25) translateY(-4px);
      transition-delay: 0s;
      .item-label {
        opacity: 1;
        transition-delay: 0.2s;
      }
    }
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

</style>
