<template>
  <div class="tabsbar" v-if="tabs.length">
    <div v-for="(item, index) in tabs" :key="index" class="tabsbar__tab" @click="emit('openBrowser')">
      <p>{{item}}</p>
    </div>
  </div>
</template>

<script>
import emit from './mixins/emit'

  export default {
    props: ['tabs'],
    mixins: [emit]
  }

</script>

<style scoped lang="scss">

  .tabsbar {
    position: relative;
    margin: auto;
    margin-top: 12px;
    display: flex;
    background: rgba(255, 0, 0, 0.25);
    justify-content: center;
    max-width: calc(100% - 472px);
    height: 36px;
  }


  .tabsbar__tab {
    position: relative;
    margin: 0px 12px;
    height: 36px;
    width: 36px;

    text-align: center;
    color: white;
    background: rgba(255, 0, 0, 0.5);
    cursor: pointer;
    // margin-left: 236px;
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