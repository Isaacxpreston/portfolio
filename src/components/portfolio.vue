<template>
  <div>
    <h1>{{content.header}}</h1>
    <p>{{content.copy}}</p>
  </div>
</template>

<script>
  export default {
    props: ['content']
  }
</script>

<style scoped lang="scss">
  // .portfolioContainer {
  //   position: absolute;
  //   // background: rgba(255, 0, 0, 0.1);
  //   background: white;
  //   top: 0;
  //   left: 0;
  //   width: 100%;
  //   height: 100%;
  // }
</style>
