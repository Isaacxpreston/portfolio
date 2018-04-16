<template>
  <nav class="navigation">
    <navigationItem v-for="(item, index) in items" :key="index" :data="item" />
  </nav>
</template>

<script>

import navigationItem from './navigationItem'

export default {
  data () {
    return {
      items: [
        {
          title: 'menu item 1',
          children: []
        },
        {
          title: 'menu item 2',
          children: [
            {
              title: 'menu 2 child 1',
              children: []
            },
            {
              title: 'menu 2 child 2',
              children: []
            }
          ]
        },
        {
          title: 'menu item 3',
          children: [
            {
              title: 'menu 3 child 1',
              children: [
                {
                  title: 'grandchild 1',
                  children: []
                },
                {
                  title: 'grandchild 2',
                  children: []
                }
              ]
            },
            {
              title: 'menu 3 child 2',
              children: []
            }
          ]
        },
      ]
    }
  },
  components: {
    navigationItem
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
