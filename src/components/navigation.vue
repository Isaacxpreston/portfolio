<template>
  <nav class="navigation">
    <navigationItem v-for="(item, index) in data" :key="index" :data="item" :parentTemplate="parentTemplate" @change="emit" />
  </nav>
</template>

<script>
  import navigationItem from './navigationItem'
  import emit from './mixins/emit'
  import applyChange from './mixins/applyChange'

  export default {
    mixins: [emit, applyChange],
    props: ['data', 'parentTemplate'],
    components: {
      navigationItem
    },
  }

</script>


<style scoped lang="scss">
  @import '../assets/scss/breakpoints';

  .navigation {
    position: absolute;
    background: rgba(255, 0, 0, 0.35);
    top: 0;
    left: 0;
    width: 200px;
    height: 100%;
    overflow: auto;
    box-sizing: border-box;
    z-index: 2;
    padding: 12px;
    @media screen and (max-width: $mobile-max) {
      // width: 100%;
      // background: white;
      // transform: translateX(-100%);
      display: none;
    }
  }

</style>
