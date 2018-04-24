<template>
  <div class="item-label">
    <p>
      <slot></slot>
    </p>
  </div>
</template>


<style lang="scss" scoped>
  .item-label {
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
