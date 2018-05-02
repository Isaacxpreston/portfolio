// https://vuex.vuejs.org/en/getting-started.html

import Vue from 'vue'
import Vuex from 'vuex'

import browsers from '../assets/js/browsers'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    browsers,
    showNavigation: false
  },
  mutations: {

    openBrowser(state, browserTemplate, tabNavigatedTo) {

      // return if does not exist
      if (!state.browsers[browserTemplate]) return

      // close menuNav
      state.showNavigation = false

      // show browser
      state.browsers[browserTemplate].classes.hidden = false

      // open tab
      state.browsers[browserTemplate].tabData.open = true

      // click appropriate tab from menuNav
      // todo: handle clicking parent element
      if (tabNavigatedTo) {
        // tabNavigatedTo = tabNavigatedTo || state.browsers[browserTemplate]
        state.changeCurrentTemplate(browserTemplate, tabNavigatedTo)
      }

    },
    minimizeBrowser(state, browserTemplate) {
      // hide browser without closing tab
      state.browsers[browserTemplate].classes.hidden = true
    },
    closeBrowser(state, browserTemplate) {
      // close tab
      state.browsers[browserTemplate].tabData.open = false
    },
    bringToFront(state, browserTemplate) {
      // add z-index class to browser on click or open

      // remove class from all templates first
      for (let key in state.browsers) {
        state.browsers[key].classes['browser--top'] = false
      }

      // add class
      state.browsers[browserTemplate].classes['browser--top'] = true
    },
    toggleFullscreenBrowser(state, browserTemplate) {
      // toggle fullscreen class
      state.browsers[browserTemplate].classes['browser--fullscreen'] = !state.browsers[browserTemplate].classes[
        'browser--fullscreen'
      ]
    },
    changeCurrentTemplate(state, payload) {
      let data = payload.data
      let browserTemplate = payload.browserTemplate
      // change browser view on navigation click (fired in navigationItem.vue)
      state.browsers[browserTemplate].currentTemplate = {
        template: data.template,
        content: data.content
      }
    },
    toggleNavigation(state) {
      // toggle menuNav display
      state.showNavigation = !state.showNavigation ? true : false
    }
  },
  actions: {
    openBrowser (context, browserTemplate, tabNavigatedTo) {
      context.commit('openBrowser', browserTemplate, tabNavigatedTo)
      context.commit('bringToFront', browserTemplate)
    }
  }
})
