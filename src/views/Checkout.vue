<template lang="pug">
  div#checkout
    Header(
      headerTitle="Checkout"
    )
      div.header__left(
        slot="header__left"
        @click="$router.push('/')"
      )
        i.material-icons arrow_back

    div.checkout__section

      div.checkout__box.section__border
        div.section__title
          p.checkout__box-title Payment Info

      form.checkout__form(
        name="paymentInfo"
        @submit.prevent="sendPaymentInfo"
      )
        div.checkout__form-box
          input.checkout__form-input(
            type="tel"
            required="required"
            v-mask="cardNumber.mask"
            v-model.trim="cardNumber.value"
            :maxlength="cardNumber.maxlength"
            :placeholder="cardNumber.placeholder"
          )
        div.checkout__form-box
          input.checkout__form-input(
            type="tel"
            required="required"
            v-mask="expiryDate.mask"
            v-model.trim="expiryDate.value"
            :maxlength="expiryDate.maxlength"
            :placeholder="expiryDate.placeholder"
          )
        div.checkout__form-box
          input.checkout__form-input(
            type="tel"
            required="required"
            v-mask="cvcNumber.mask"
            v-model.trim="cvcNumber.value"
            :maxlength="cvcNumber.maxlength"
            :placeholder="cvcNumber.placeholder"
          )

    BottomButton(
      btnLabel="Checkout"
    )
      div.bottomButton__wrapper(
        @click="sendPaymentInfo"
      )
        p.bottomButton__label Checkout
</template>

<script>
import { mapState, mapMutations } from 'vuex'
import Header from '@/components/Header.vue'
import BottomButton from '@/components/BottomButton.vue'

export default {
  name: 'checkout',

  computed: {
    cardNumber: {
      get () {
        return this.$store.state.cardNumber
      },
      set (value) {
        this.$store.commit('UPDATE_CARD_NUMBER', value)
      }
    },

    expiryDate: {
      get () {
        return this.$store.state.expiryDate
      },
      set (value) {
        this.$store.commit('UPDATE_EXPIRY_DATE', value)
      }
    },

    cvcNumber: {
      get () {
        return this.$store.state.cvcNumber
      },
      set (value) {
        this.$store.commit('UPDATE_CVC_NUMBER', value)
      }
    },
  },

  methods: {
    sendPaymentInfo() {
      this.$Progress.start()

      if (! this.cardNumber.value) {
        this.$toasted.show('Please enter your card number', {
          theme: 'primary',
          position: 'bottom-center',
          duration: 2500,
        })
      }
      else if (! this.expiryDate.value) {
        this.$toasted.show('Please write the rigth year and month', {
          theme: 'primary',
          position: 'bottom-center',
          duration: 2500,
        })
      }
      else if (! this.cvcNumber.value) {
        this.$toasted.show('Please enter your Card Validation Code', {
          theme: 'primary',
          position: 'bottom-center',
          duration: 2500,
        })
      }
      else {
        this.$toasted.show('Your request is being processed...', {
          theme: 'primary',
          position: 'bottom-center',
          duration: 2500,
        })
      }

      this.$Progress.finish()
    },
  },

  components: {
    Header,
    BottomButton,
  },

}
</script>

<style lang="scss" scoped>
#checkout {
  .checkout__section {
    padding: $header $grid4x 0;

    .checkout__box {
      .section__title {
        width: 100%;
        font-weight: 700;
        height: $grid12x;
        @include font-size($grid4x);

        p {
          @include line-height($grid7x);
        }
      }
    }
  }
}
</style>
