<template>
  <nav class="navigation">
    <navigationItem v-for="(item, index) in data" :key="index" :data="item" @change="testFromNav" />
  </nav>
</template>

<script>

import navigationItem from './navigationItem'
import emit from './mixins/emit'
import applyChange from './mixins/applyChange'

export default {
  mixins: [emit, applyChange],
  props: ['data'],
  components: {
    navigationItem
  },
  methods: {
    testFromNav (callback, args) {
      console.log('nav hit with', callback, args)
      this.emit(callback, args)

    }
  }

}
</script>


<style scoped lang="scss">
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
  }

</style>
