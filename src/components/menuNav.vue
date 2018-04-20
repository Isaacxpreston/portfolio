<template>
  <div class="menuNav" v-if="showNavigation">
    <div class="menuTab">
      <div class="iconPlaceholder"></div>
      <div class="label">open</div>
    </div>
  </div>
</template>

<script>
  export default {
    props: ['showNavigation']
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
