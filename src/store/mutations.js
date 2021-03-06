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
    let items = Object.entries(state.dedicatePlan)
    for (let i = 0; i < items.length; i++) {
      items[i][1].selected = 'radio_button_unchecked'
    }
    return state.dedicatePlan[key].selected = 'radio_button_checked'
  },

  SET_WEEKLY_GOAL: (state, [type, value]) => {
    state.currentPlan[type] = Number(value)
    state.weeklyGoal[type].placeholder = Number(value)
  },

  SET_TOTAL_PRICE: (state, value) => {
    state.currentPlan['totalPrice'] = value
  },

  SET_DEDICATE_PLAN: (state, [_duration, _totalPrice]) => {
    state.currentPlan['duration'] = Number(_duration)
    state.currentPlan['totalPrice'] = Number(_totalPrice.replace(/,\s?/g, ''))
  },

  SET_PROMOTION_CODE: (state, value) => {
    state.promotionCode = value
    state.currentPlan['promotionCode'] = value
  },

  UPDATE_FORM_DETAILS: (state, [value, key]) => {
    state.paymentInfo[key].value = Number(value.replace(/,\s?/g, ''))
    console.log(state.paymentInfo[key].value)
  },

  UPDATE_CARD_NUMBER: (state, value) => {
    state.cardNumber.value = value
    state.creditCardInfo[cardNumber] = value
    console.log(state.cardNumber.value)
  },

  UPDATE_EXPIRY_DATE: (state, value) => {
    state.expiryDate.value = value
    state.creditCardInfo[expiryDate] = value
    console.log(state.expiryDate.value)
  },

  UPDATE_CVC_NUMBER: (state, value) => {
    state.cvcNumber.value = value
    state.creditCardInfo[cvcNumber] = value
    console.log(state.cvcNumber.value)
  },

}
