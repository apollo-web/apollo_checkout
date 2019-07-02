import {
  globalVar
} from '@/globalVar'

export const state = {

  bottomSheet: false,

  radioChecked: false,

  weeklyGoal: {
    'mins per day': [
      '15 minutes',
      '30 minutes',
      '45 minutes',
      '60 minutes',
      '120 minutes',
    ],
    'days per week': [
      '1',
      '2',
      '3',
      '4',
      '5',
      '6',
      '7',
    ],
  },

  currentPlan: {
    'minutes': String,
    'days': String,
    'duration': String,
    'oPrice': String,
    'saved': String,
    'tPrice': String,
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
