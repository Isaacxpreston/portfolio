import interact from 'interactjs'

export default () => {
  // initialize interactjs

  const dragMoveListener = (event) => {
    let target = event.target,
      // keep the dragged position in the data-x/data-y attributes
      x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx,
      y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy;
    // translate the element
    target.style.webkitTransform = target.style.transform = 'translate(' + x + 'px, ' + y + 'px)';
    // update the posiion attributes
    target.setAttribute('data-x', x);
    target.setAttribute('data-y', y);
  }

  interact('.icons-container')
    .draggable({
      allowFrom: '.icon',
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
}
