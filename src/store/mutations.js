export const mutations = {

  SET_BOTTOM_SHEET: (state, bool) => {
    if (!bool) {
      setTimeout(() => {
        state.bottomSheet = bool
      }, 250)
    } else {
      state.bottomSheet = bool
    }
  },

  SET_RADIO_BTN: (state, key) => {
    let items = Object.entries(state.plans)
    for (let i = 0; i < items.length; i++) {
      items[i][1].selected = 'radio_button_unchecked'
    }
    return state.plans[key].selected = 'radio_button_checked'
  },

}
