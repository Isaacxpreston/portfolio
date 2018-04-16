<template>
  <div class="navigation__item">
    <h4>{{data.title}}</h4>
    <navigationItem v-for="(item, index) in data.children" :key="index" :data="item" />
  </div>
</template>

<script>
import navigationItem from './navigationItem'

export default {
  props: ['data'],
  name: 'navigationItem'
}
</script>


<style scoped lang="scss">
  .navigation__item {
    position: relative;
    box-sizing: border-box;
    width: 100%;
    padding-left: 12px;
    cursor: pointer;
    // height: 22px;
    // overflow: hidden;
    >h4 {
      position: relative;
      border-left: 1px solid white;
      box-sizing: border-box;
      padding-left: 12px;
      padding-right: 12px;
      &:hover {
        background: rgba(255, 255, 255, 0.25);
      }
      &::after {
        position: absolute;
        content: ' ';
        width: 6px;
        height: 1px;
        background: white;
        top: 50%;
        left: 0;
        transform: translateY(-50%);
      }
    }
  }

</style>
