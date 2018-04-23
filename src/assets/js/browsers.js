// create data with default values

const createBrowser = (obj) => {
  const defaults = {
    'classes': {
      'hidden': true,
      'browser--fullscreen': false,
      'browser--top': false,
    },
    children: false
  }
  return {
    ...defaults,
    ...obj  
  }
}

const createTab = (obj) => {
  const defaults = {
    'icon': 'T',
    'open': false
  }
  return {
    ...defaults,
    ...obj
  }
}

// todo: secondary (child) browsers object(s), or bool to show/hide on main menu


// todo: add some kind of override behavior for contact, so clcking on links opens external links (github, linkedin, email, etc)
let contactChildren = {
  'linkedIn': createBrowser({
    'tabData': createTab({
      'label': 'LinkedIn'
    }),
    'template': 'about',
    'content': {
      'header': 'my linkedin',
      'copy': 'link to my linkedin will go here'
    }
  }),
  'gitHub': {
    'tabData': createTab({
      'label': 'GitHub'
    })
  },
  'email': {
    'tabData': createTab({
      'label': 'Email'
    })
  }
}

let aboutChildren = {
  'bio': createBrowser({
    'tabData': createTab({
      'icon': 'B',
      'label': 'biography',
    }),
    'template': 'about',
    'content': {
      'header': 'my biography',
      'copy': 'biography copy will go here'
    }
  }),
  'resume': createBrowser({
    'tabData': createTab({
      'icon': 'R',
      'label': 'resume',
    }),
    'template': 'about',
    'content': {
      'header': 'my resume',
      'copy': 'link to my resume will go here'
    }
  }),
  'contact': createBrowser({
    'tabData': createTab({
      'icon': 'C',
      'label': 'contact',
    }),
    'template': 'about',
    'content': {
      'header': 'contact info',
      'copy': 'contact links will go here'
    },
    'children': contactChildren
  }),
  'credits': createBrowser({
    'tabData': createTab({
      'icon': 'C',
      'label': 'website credits',
    }),
    'template': 'about',
    'content': {
      'header': 'about this website/credits',
      'copy': 'made with vue.js and interactjs, etc.'
    }
  })
}


// all browser data
export default {
  'portfolio': createBrowser({
    'tabData': createTab({
      'icon': 'P', // todo: make icon an image / include a default image
      'label': 'my portfolio',
    }),
    'template': 'portfolio',
    'content': {
      'header': 'portfolio',
      'copy': 'content here'
    },
  }),
  'about': createBrowser({
    'tabData': createTab({
      'icon': 'A',
      'label': 'about me',
    }),
    'template': 'about',
    'content': {
      'header': 'about me',
      'copy': '<---- click on a link to the left to get started'
      // todo: potentially just have icons on 'parent' browsers like a file explorer would
    },
    'children': aboutChildren
  })
}
