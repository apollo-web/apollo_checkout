import {
  globalVar
} from '@/globalVar'

export const state = {

  bottomSheet: false,

  radioChecked: false,

  promotionCode: '',

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
    'minutes per day': 15,
    'days per week': 1,
    'duration': 1,
    'totalPrice': globalVar.monthlyPrice,
    'promotionCode': '',
  },

  dedicatePlan: {
    'Month': {
      'selected': 'radio_button_checked',
      'duration': 1,
      'renews': 'every month',
      'originalPrice': globalVar.monthlyPrice,
      'save': 0,
    },
    '3 Months': {
      'selected': 'radio_button_unchecked',
      'duration': 3,
      'renews': 'every 3 months',
      'originalPrice': globalVar.monthlyPrice * 3,
      'save': 15,
    },
    '6 Months': {
      'selected': 'radio_button_unchecked',
      'duration': 6,
      'renews': 'every 6 months',
      'originalPrice': globalVar.monthlyPrice * 6,
      'save': 25,
    },
    '1 Year': {
      'selected': 'radio_button_unchecked',
      'duration': 12,
      'renews': 'every 12 months',
      'originalPrice': globalVar.monthlyPrice * 12,
      'save': 35,
    },
  },

  cardNumber: {
    maxlength: '',
    placeholder: 'Card Number',
    mask: '#### #### #### ####',
    value: '',
  },
  expiryDate: {
    maxlength: '',
    placeholder: 'Expiry Date',
    mask: '##/##',
    value: '',
  },
  cvcNumber: {
    maxlength: '',
    placeholder: 'CVC Number',
    mask: '####',
    value: '',
  },

  creditCardInfo: {
    cardNumber: '',
    expiryDate: '',
    cvcNumber: '',
  },

}
