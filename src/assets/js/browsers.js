// method to create object with default values
let createBrowser = (obj) => {
  let defaults = {
    'classes': {
      'hidden': true,
      'browser--fullscreen': false,
      'browser--top': false,
    },
  }
  return {
    ...defaults,
    ...obj
  }
}

// all browser data
export default {
  'portfolio': createBrowser({
    'tabData': {
      icon: 'P', // todo: make icon an image / include a default image
      label: 'my portfolio'
    },
    'template': 'portfolio'
  }),
  'about': createBrowser({
    'tabData': {
      icon: 'A',
      label: 'about me'
    },
    'template': 'about'
  })
}
