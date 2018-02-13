<template>
  <div class="portfolioContainer">
    <div class="portfolioNavigation">
      <div class="navItem">
        <div class="menu title">menu</div>
        <div class="navItem">
          <div class="title">menu item</div>
        </div>
        <div class="navItem">
          <div class="title">menu item</div>
        </div>
        <div class="navItem">
          <div class="menu title">submenu</div>
          <div class="navItem">
            <div class="title">submenu item</div>
          </div>
          <div class="navItem">
            <div class="title">submenu item</div>
          </div>
        </div>
      </div>
    </div>
    <div class="portfolioWindow">
      here
    </div>
  </div>
</template>

<style scoped lang="scss">
  .portfolioContainer {
    position: absolute;
    background: rgba(255, 0, 0, 0.1);
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }

  .portfolioNavigation {
    position: absolute;
    background: rgba(255, 0, 0, 0.35);
    top: 0;
    left: 0;
    width: 200px;
    height: 100%;
  }

  .portfolioWindow {
    position: absolute;
    background: rgba(255, 0, 0, 0.15);
    top: 0;
    right: 0;
    width: calc(100% - 200px);
    height: 100%;
  }

  .navItem {
    position: relative;
    box-sizing: border-box;
    width: 100%;
    padding-left: 12px;
    cursor: pointer;
    .title {
      position: relative;
      border-left: 1px solid white;
      box-sizing: border-box;
      padding-left: 6px;
      padding-right: 6px;
      &:hover {
        background: rgba(255, 255, 255, 0.25);
      }
    }
    .menu::after {
      position: absolute;
      content: ' ';
      width: 12px;
      height: 1px;
      background: white;
      bottom: 0;
      left: 0;
    }
  }

</style>
