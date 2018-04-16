<template>
  <div class="portfolioContainer">
    <navigation />
    <div class="portfolioWindow">
      content here
      <!-- <div>(Image)</div>
      <h1>Title</h1>
      <p><em>quick links (github, url, etc.)</em></p>
      <p><em>brief description</em></p>
      <h2>popout gallery</h2>
      <div>gallery thumbnails</div> -->
    </div>
  </div>
</template>

<script>
  import interact from 'interactjs'
  import navigation from './navigation'

  export default {
    data () {
      return {
        // data here
      }
    },
    components: {
      navigation
    }
  }

</script>

<style scoped lang="scss">
  .portfolioContainer {
    position: absolute;
    background: rgba(255, 0, 0, 0.1);
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }

  .portfolioWindow {
    position: absolute;
    padding: 12px;
    box-sizing: border-box;
    background: rgba(255, 0, 0, 0.5);
    top: 0;
    right: 0;
    width: calc(100% - 200px);
    height: 100%;
    overflow: auto;
    z-index: 1;
  }

</style>
