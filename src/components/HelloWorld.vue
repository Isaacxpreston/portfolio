<template>
  <div class="browserContainer">

    
    <div class="browserWindow" v-if="showWindow">
      <div class="banner">
        <div class="close" v-on:click="close">X</div>
      </div>
      <div class="content">
        <p>content</p>
        <p>content</p>
        <p>content</p>
        <p>content</p>
        <p>content</p>
        <p>content</p>
        <p>content</p>
        <p>content</p>
        <p>content</p>
        <p>content</p>
        <p>content</p>
        <p>content</p>
        <p>content</p>
        <p>content</p>
        <p>content</p>
        <p>content</p>
      </div>
    </div>



  </div>
</template>

<script>
  import interact from 'interactjs'

  export default {
    name: 'HelloWorld',
    data() {
      return {
        showWindow: true
      }
    },
    methods: {
      close () {
        this.showWindow = false
      }
    },
    mounted() {
      
      // resize / reposition elements on window resize
      window.addEventListener('resize', () => {

        let elOffsetX = parseInt(document.querySelector('.browserWindow').getAttribute('data-x')) || 0
        let elOffsetY = parseInt(document.querySelector('.browserWindow').getAttribute('data-y')) || 0
        let elWidth = parseInt(window.getComputedStyle(document.querySelector('.browserWindow'))['width'].replace('px', ''))
        let elCombinedX = elOffsetX + elWidth

        let containerWidth = parseInt(window.getComputedStyle(document.querySelector('.browserContainer'))['width'].replace('px', ''))


        if (elCombinedX > containerWidth) {
            let newOffsetX = (containerWidth - elWidth) // - 24 // ?? not sure why I need 10px here.
            document.querySelector('.browserWindow').style.transform = 'translate(' + newOffsetX + 'px, ' + elOffsetY + 'px)'
            document.querySelector('.browserWindow').setAttribute('data-x', newOffsetX)
        }

      })



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

      interact('.browserWindow')
        .draggable({
          allowFrom: '.banner',
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
              width: 100,
              height: 50
            },
          },

          inertia: false
        })
        .on('resizemove', function (event) {
          console.log('resizemove event fired')
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
          // target.textContent = Math.round(event.rect.width) + '\u00D7' + Math.round(event.rect.height);
        })

    }
  }

</script>

<style scoped lang='scss'>


  .browserContainer {
    position: absolute;
    box-sizing: border-box;
    border: 5px solid rgba(255, 0, 0, 0.5);
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    margin: auto;
    width: 1200px;
    height: 600px;
    max-width: 100vw;
    max-height: 100vh;
    background: rgba(255, 0, 0, 0.15);
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    // todo: make an auto height rule for short screens/mobile
  }

  .browserWindow {
    position: relative;
    width: 200px;
    height: 200px;
    background: white; // cursor: pointer;
    box-sizing: border-box;
    border: 12px solid rgba(255, 0, 0, 0.5);
    max-width: 100%;
    max-height: 100%;
  }

  .content {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: calc(100% - 48px);
    margin-top: 48px;
    overflow: scroll;
    background: white;
  }

  .banner {
    position: absolute;
    height: 48px;
    width: 100%;
    top: 0;
    left: 0;
    background: rgba(255, 0, 0, 0.75);
  }

  .close {
    position: absolute;
    top: 0;
    right: 0;
    width: 24px;
    height: 24px;
    background: rgba(255, 0, 0, 0.75);
    margin-top: 12px;
    margin-right: 12px;
    cursor: pointer;
    color: white;
    text-align: center;
  }

</style>
