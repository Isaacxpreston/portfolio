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

      // bring browser to front on open
      state.bringToFront(browserTemplate)

      // click appropriate tab from menuNav
      // todo: handle clicking parent element
      if (tabNavigatedTo) {
        // tabNavigatedTo = tabNavigatedTo || state.browsers[browserTemplate]
        state.changeCurrentTemplate(browserTemplate, tabNavigatedTo)
      }

    },

    toggleNavigation(state) {
      // toggle menuNav display
      state.showNavigation = !state.showNavigation ? true : false
    }
  }
})