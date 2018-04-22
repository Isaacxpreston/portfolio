<template>
  <!-- browser -->
  <div class="browser" :class="[browserClass]" @click="emit('bringToFront', [view])">
    <div class="topbar">
      <div class="topbar__icon topbar__icon--minimize" @click="emit('minimizeBrowser', browserArgs)">m</div>
      <div class="topbar__icon topbar__icon--fullscreen" @click="emit('toggleFullscreenBrowser', browserArgs)">{{fullscreenIcon}}</div>
      <div class="topbar__icon topbar__icon--close" @click="emit('closeBrowser', browserArgs)">X</div>
    </div>
    <div class="browser__content">
      <!-- browser content from props -->
      <component :is="view" />
    </div>
  </div>
</template>


<script>
  import interact from 'interactjs'
  import portfolio from './portfolio'
  import about from './about'
  import emit from './mixins/emit'

  export default {
    props: ['browserClass', 'view', 'tab'],
    mixins: [emit],
    data() {
      return {
        browserArgs: [
          this.tab,
          this.view
        ]
      }
    },
    computed: {
      fullscreenIcon() {
        return this.browserClass['browser--fullscreen'] ? '-' : '+'
      }
    },
    mounted() {

      // resize / reposition elements on window resize
      window.addEventListener('resize', () => {

        let elOffsetX = parseInt(document.querySelector('.browser').getAttribute('data-x')) || 0
        let elOffsetY = parseInt(document.querySelector('.browser').getAttribute('data-y')) || 0
        let elWidth = parseInt(window.getComputedStyle(document.querySelector('.browser'))['width'].replace(
          'px', ''))
        let elCombinedX = elOffsetX + elWidth

        let containerWidth = parseInt(window.getComputedStyle(document.querySelector('.main-container'))['width']
          .replace('px', ''))


        if (elCombinedX > containerWidth) {
          let newOffsetX = (containerWidth - elWidth) // - 24 // ?? not sure why I need 10px here.
          document.querySelector('.browser').style.transform = 'translate(' + newOffsetX + 'px, ' + elOffsetY +
            'px)'
          document.querySelector('.browser').setAttribute('data-x', newOffsetX)
        }

      })

      // todo: make a mixin.

      function dragMoveListener(event) {
        var target = event.target,
          // keep the dragged position in the data-x/data-y attributes
          x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx,
          y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy;

        // translate the element
        target.style.webkitTransform = target.style.transform = 'translate(' + x + 'px, ' + y + 'px)';
        // update the posiion attributes
        target.setAttribute('data-x', x);
        target.setAttribute('data-y', y);
      }

      //

      interact('.browser')
        .draggable({
          allowFrom: '.topbar, .icon',
          onmove: dragMoveListener,
          restrict: {
            restriction: 'parent',
            elementRect: {
              top: 0,
              left: 0,
              bottom: 1,
              right: 1
            }
          }
        })
      interact('.browser')
        .resizable({

          // resize from all edges and corners  
          edges: {
            left: true,
            right: true,
            bottom: true,
            top: true
          },

          // keep the edges inside the parent
          restrictEdges: {
            outer: 'parent',
            endOnly: true,
          },

          // minimum size
          restrictSize: {
            min: {
              width: 400,
              height: 250
            },
          },

          inertia: false
        })
        .on('resizemove', function (event) {
          var target = event.target,
            x = (parseFloat(target.getAttribute('data-x')) || 0),
            y = (parseFloat(target.getAttribute('data-y')) || 0);

          // update the element's style
          target.style.width = event.rect.width + 'px';
          target.style.height = event.rect.height + 'px';

          // translate when resizing from top or left edges
          x += event.deltaRect.left;
          y += event.deltaRect.top;

          target.style.webkitTransform = target.style.transform =
            'translate(' + x + 'px,' + y + 'px)';

          target.setAttribute('data-x', x);
          target.setAttribute('data-y', y);
        })

    },
    components: {
      portfolio,
      about
    }
  }

</script>

<style scoped lang='scss'>
  .browser {
    position: absolute;
    top: 0;
    left: 0;
    width: 850px;
    height: 500px;
    background: white; // cursor: pointer;
    box-sizing: border-box;
    border: 12px solid rgba(255, 0, 0, 0.5);
    max-width: 100%;
    max-height: 100%;
    z-index: 1;
    &--fullscreen {
      width: 100% !important;
      height: 100% !important;
      transform: none !important;
      transition: width 0.4s ease, height 0.4s ease, transform 0.4s ease;
    }
    &--top {
      z-index: 2;
    }
    @media screen and (max-width: 767px) {
      // todo: find a better way to write this
      width: 100% !important;
      height: 100% !important;
      transform: none !important;
      transition: width 0.4s ease, height 0.4s ease, transform 0.4s ease;
    }
  }

  .browser__content {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: calc(100% - 48px);
    margin-top: 48px;
    overflow: scroll;
    background: white;
  }

  .topbar {
    position: absolute;
    height: 48px;
    width: 100%;
    top: 0;
    left: 0;
    background: rgba(255, 0, 0, 0.75);
  }

  .topbar__icon {
    position: absolute;
    top: 0;
    right: 0;
    width: 24px;
    height: 24px;
    background: rgba(255, 0, 0, 0.75);
    margin-top: 12px;
    cursor: pointer;
    color: white;
    text-align: center;
    user-select: none;
    &--minimize {
      margin-right: 84px;
      @media screen and (max-width: 767px) {
        display: none;
      }
    }
    &--fullscreen {
      margin-right: 48px;
      @media screen and (max-width: 767px) {
        display: none;
      }
    }
    &--close {
      margin-right: 12px;
    }
  }


  .hidden {
    opacity: 0;
    pointer-events: none;
  }

</style>
