<template>
  <div class="portfolioContainer">
    <div class="portfolioNavigation">
      <div class="navItem">
        <div class="title">menu</div>
        <div class="navItem">
          <div class="title">menu item</div>
        </div>
        <div class="navItem">
          <div class="title">menu item</div>
        </div>
        <div class="navItem">
          <div class="title">submenu</div>
          <div class="navItem">
            <div class="title">submenu item</div>
          </div>
          <div class="navItem">
            <div class="title">submenu item</div>
            <div class="navItem">
              <div class="title">submenu (2)</div>
              <div class="navItem">
                <div class="title">submenu (2) item</div>
              </div>
              <div class="navItem">
                <div class="title">submenu (2) item</div>
                <div class="navItem">
                  <div class="title">submenu (3)</div>
                  <div class="navItem">
                    <div class="title">submenu (3) item</div>
                  </div>
                  <div class="navItem">
                    <div class="title">submenu (3) item</div>
                    <div class="navItem">
                      <div class="title">submenu (2)</div>
                      <div class="navItem">
                        <div class="title">submenu (2)</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="portfolioWindow">
      here
    </div>
  </div>
</template>

<script>
  import interact from 'interactjs'

  export default {
    data () {
      return {
        testData: 'foo bar'
      }
    },
    mounted() {
      let ctx = this
      interact('.portfolioNavigation')
        .resizable({

          // resize from right edge
          edges: {
            right: true,
          },

          // keep the edges inside the parent
          restrictEdges: {
            outer: 'parent',
            endOnly: true,
          },

          // min/max size
          restrictSize: {
            min: {
              width: 200,
            },
            max: {
              width: 300
            }
          },

          inertia: false
        })
        .on('resizemove', function (event) {
          
          let portfolioWindow = document.querySelector('.portfolioWindow')

          var target = event.target,
            x = (parseFloat(target.getAttribute('data-x')) || 0),
            y = (parseFloat(target.getAttribute('data-y')) || 0);

          // update the element's style
          target.style.width = event.rect.width + 'px';
          portfolioWindow.style.width = 'calc(100% - ' + event.rect.width + 'px)' 


          // translate when resizing from top or left edges
          x += event.deltaRect.left;
          y += event.deltaRect.top;

          target.style.webkitTransform = target.style.transform =
            'translate(' + x + 'px,' + y + 'px)';

          target.setAttribute('data-x', x);
          target.setAttribute('data-y', y);
        })
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

  .portfolioNavigation {
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
