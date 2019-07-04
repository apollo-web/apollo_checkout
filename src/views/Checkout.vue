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
        div.checkout__form-box(
          v-for="(info, key, index) in paymentInfo"
        )
          input.checkout__form-input(
            type="tel"
            v-mask="info.mask"
            required="required"
            v-model.trim="info.value"
            :maxlength="info.maxlength"
            :placeholder="info.placeholder"
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
    ...mapState([
    ]),

    paymentInfo: {
      get () {
        return this.$store.state.paymentInfo
      },
      set (value) {
        this.$store.commit('UPDATE_FORM_DETAILS', value)
      }
    }
  },

  methods: {
    ...mapMutations([
      'UPDATE_FORM_DETAILS',
    ]),

    sendPaymentInfo() {
      this.$Progress.start()

      if (! this.paymentInfo[0].value) {
        this.$toasted.show('Please enter your card number', {
          theme: 'primary',
          position: 'bottom-center',
          duration: 2500,
        })
        this.$Progress.finish()
      }
      else if (! this.paymentInfo[1].value) {
        this.$toasted.show('Please write the rigth year and month', {
          theme: 'primary',
          position: 'bottom-center',
          duration: 2500,
        })
        this.$Progress.finish()
      }
      else if (! this.paymentInfo[2].value) {
        this.$toasted.show('Please enter your Card Validation Code', {
          theme: 'primary',
          position: 'bottom-center',
          duration: 2500,
        })
        this.$Progress.finish()
      }
      else {
        this.$toasted.show('Your request is being processed...', {
          theme: 'primary',
          position: 'bottom-center',
          duration: 2500,
        })
      }
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
