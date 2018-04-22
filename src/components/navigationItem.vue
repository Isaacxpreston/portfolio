<template>
  <div class="navigation__item">
    <h4 @click="expanded = !expanded">{{data['tabData']['label']}} <small>{{expandText}}</small></h4>
    <navigationItem v-if="data['children']" v-for="(item, index) in data['children']" :key="index" :data="item" v-show="expanded" />
  </div>
</template>

<script>
  import navigationItem from './navigationItem'

  export default {
    props: ['data'],
    // name is needed for recursive components
    // https://vuejs.org/v2/guide/components-edge-cases.html#Recursive-Components
    name: 'navigationItem',
    data () {
      return {
        expanded: false
      }
    },
    computed: {
      expandText () {
        // todo: check for null and typeof undefined.
        if (this.data.children) {
          return this.expanded ? '[ - ]' : '[+]'
        } else {
          return ''
        }
      }
    },
    // mounted () {
    //   console.log('mounted with')
    //   console.log(this.data)
    // }
  }

</script>


<style scoped lang="scss">
  .navigation__item {
    position: relative;
    box-sizing: border-box;
    width: 100%;
    padding-left: 12px;
    cursor: pointer;
    user-select: none;
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
      >small {
        color: white;
        font-size: 8px;
        display: inline-block;
        vertical-align: middle;
      }
    }
  }

</style>
