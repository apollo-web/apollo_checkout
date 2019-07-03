import {
  globalVar
} from '@/globalVar'

export const state = {

  bottomSheet: false,

  radioChecked: false,

  weeklyGoal: {
    'minutes per day': {
      placeholder: '15',
      values: [
        '15',
        '30',
        '45',
        '60',
        '120',
      ]
    },
    'days per week': {
      placeholder: '1',
      values: [
        '1',
        '2',
        '3',
        '4',
        '5',
        '6',
        '7',
      ]
    },
  },

  currentPlan: {
    'minutes per day': String,
    'days per week': String,
    'duration': String,
    'originalPrice': String,
    'saved': String,
    'totalPrice': String,
  },

  plans: {
    'Month': {
      'selected': 'radio_button_checked',
      'm': 1,
      'renews': 'every month',
      'price': globalVar.monthlyPrice,
      'rate': 0,
    },
    '3 Months': {
      'selected': 'radio_button_unchecked',
      'm': 3,
      'renews': 'every 3 months',
      'price': globalVar.monthlyPrice * 3,
      'rate': 15,
    },
    '6 Months': {
      'selected': 'radio_button_unchecked',
      'm': 6,
      'renews': 'every 6 months',
      'price': globalVar.monthlyPrice * 6,
      'rate': 25,
    },
    '1 Year': {
      'selected': 'radio_button_unchecked',
      'm': 12,
      'renews': 'every 12 months',
      'price': globalVar.monthlyPrice * 12,
      'rate': 35,
    },
  },

}
