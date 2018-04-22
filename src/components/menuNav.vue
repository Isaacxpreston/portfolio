<template>
  <div class="menuNav">
    
    <div class="menuTab" v-for="(browser, index) in browserData" :key="'menuTab-' + index" @click="emit('openBrowser', [browser['template']])">
      <div class="iconPlaceholder">{{browser['tabData']['icon']}}</div>
      <div class="label">{{browser['tabData']['label']}}</div>
    </div>

  </div>
</template>

<script>
  import emit from './mixins/emit'

  export default {
    mixins: [emit],
    props: ['browserData']
  }

</script>

<style scoped lang="scss">
  .menuNav {
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

</style>
