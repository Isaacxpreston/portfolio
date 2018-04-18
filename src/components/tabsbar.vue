<template>
  <div class="tabsbar" v-if="tabs.length">
    <div v-for="(item, index) in tabs" :key="index" class="tabsbar__tab" @click="emit('openBrowser', [item])">
      <p>{{item}}</p>
      <div class="tabsbar__label">
        <p>tab title placeholder</p>
      </div>
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
    white-space: nowrap;
    @media screen and (max-width: 767px) {
      display: none;
    }
  }


  .tabsbar__tab {
    position: relative;
    margin: 0px 6px;
    height: 36px;
    width: 36px;
    text-align: center;
    color: white;
    background: rgba(255, 0, 0, 0.5);
    cursor: pointer;
    transition: transform 0.2s ease-out;
    transition-delay: 0.1s;
    &:hover {
      transform: scale(1.25) translateY(-4px);
      transition-delay: 0s;
      .tabsbar__label {
        opacity: 1;
        transition-delay: 0.4s;
      }
    }
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

  .tabsbar__label {
    position: absolute;
    top: 0;
    left: 50%;
    opacity: 0;
    padding: 4px;
    pointer-events: none;
    transform: translate(-50%, -40px) scale(0.8); // reverse 1.25 scale from parent back to 1
    background: rgba(255, 0, 0, 0.25);
    ::after {
      content: ' ';
      position: absolute;
      bottom: 0;
      left: 50%;
      transform: translate(-50%, 10px);
      width: 0;
      height: 0;
      border-left: 10px solid transparent;
      border-right: 10px solid transparent;
      border-top: 10px solid rgba(255, 0, 0, 0.25);
    }
  }

</style>
