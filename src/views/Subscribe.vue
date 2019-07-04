<template lang="pug">
  div#subscribe

    Header(
      headerTitle="Subscribe"
    )
      div.header__left(
        slot="header__left"
        @click="closeBtn"
      )
        i.material-icons close

    div.subscribe__section

      div.subscribe__box.section__border
        div.section__title
          p.subscribe__box-title What's your weekly goal?
        div.section__combobox(
          v-for="(value, key, index) in weeklyGoal"
          :key="key"
        )
          div.section__combobox-sheet(
            @click="toggleSheet(true, key)"
          )
            div.section__combobox-box
              p.section__combobox-text
                span.bold {{ value.placeholder }}
                | &nbsp;{{ key }}
            div.section__combobox-icon
              i.material-icons expand_more

      div.subscribe__box.section__border
        div.section__title
          p.subscribe__box-title How much can you dedicate?
        div.section__radiobox(
          v-for="(value, key, index) in dedicatePlan"
          :key="index"
        )
          div.section__radiobox-box(
            @click="setDedicatePlan_RadioBtn(key, [value.duration, currentPlan['totalPrice']])"
          )
            div.section__radiobox-left
              div.section__radiobox-left-left
                i.material-icons {{ value.selected }}
              div.section__radiobox-left-right
                p.section__radiobox-text {{ key }}
                p.section__radiobox-renews Renews {{ value.renews }}
                div.section__radiobox-ratebox(
                  v-if="value.save"
                ) Save {{ value.save }}&percnt;
            div.section__radiobox-right
              p.section__radiobox-price {{ numberFormat(value.originalPrice, value.save, value.duration) }}

      div.subscribe__box.section__border
        div.section__title
          p.subscribe__box-title.summaryTitle Summary
        div.section__summarybox
          div.section__summarybox-box
            p.section__summarybox-text.bottomtext
              span.bold {{ currentPlan['minutes per day'] }}
              | &nbsp;minutes per day,&nbsp;
              span.bold {{ currentPlan['days per week'] }}
              | &nbsp;days per week
            p.section__summarybox-text Duration:
              span.bold &nbsp;{{ planMonth.duration }}&nbsp;
              span(
                v-if="currentPlan.duration === 1"
              ) month
              span(
                v-else-if="currentPlan.duration > 1"
              ) months

            p.section__summarybox-price Original Price
              span.section__summarybox-priceRight
                | ₩ {{ originalPriceFormat(planMonth.originalPrice) }}
            p.section__summarybox-price(
              v-if="planMonth.save"
            ) {{ planMonth.duration }} month plan: You save {{ planMonth.save }}&percnt;
              span.section__summarybox-priceRight
                | - ₩ {{ savedPrice(planMonth.originalPrice, planMonth.save, planMonth.duration) }}
            p.section__summarybox-total Total Price
              span.section__summarybox-totalRight
                | ₩ {{ totalPrice(planMonth.originalPrice, planMonth.save, planMonth.duration)  }}

    BottomButton(
      btnLabel="Next"
    )

    div.subscribe__section.bottom
      div.bottom__condition
        p.bottom__condition-text.bottomtext
          | Your subscription will automatically {{ planMonth.renews }}.
        p.bottom__condition-text
          | You can cancel at anytime.

    BottomSheet.bottomsheet(
      v-if="bottomSheet"
      :bottomSheetTitle="bottomSheetTitle"
    )
      div.bottomsheet__list(
        v-for="(value, key, index) in weeklyGoal[setBottomSheetList].values"
        :key="key"
      )
        div.bottomsheet__text(
          v-if="setBottomSheetList == 'minutes per day'"
          @click="setCurrentPlan('minutes per day', value)"
        ) {{ value }} minutes
        div.bottomsheet__text(
          v-if="setBottomSheetList == 'days per week'"
          @click="setCurrentPlan('days per week', value)"
        ) {{ value }} days
</template>

<script>
import { mapState, mapMutations } from 'vuex'
import Header from '@/components/Header.vue'
import BottomButton from '@/components/BottomButton.vue'
import BottomSheet from '@/components/BottomSheet'

export default {
  name: 'subscribe',

  data: _ => ({
    bottomSheetTitle: String,
    setBottomSheetList: String,
  }),

  computed: {
    ...mapState([
      'weeklyGoal',
      'dedicatePlan',
      'currentPlan',
      'bottomSheet',
    ]),

    planMonth () {
      let getPlanMonth = _.find(this.dedicatePlan, {'selected': 'radio_button_checked'})
      return getPlanMonth
    },
  },

  methods: {
    ...mapMutations([
      'SET_BOTTOM_SHEET',
      'SET_RADIO_BTN',
      'SET_WEEKLY_GOAL',
      'SET_TOTAL_PRICE',
      'SET_DEDICATE_PLAN',
    ]),

    closeBtn () {
      window.open("about:blank","_self").close()
      window.close()
      window.postMessage('close')
    },

    setCurrentPlan (type, value) {
      this.SET_WEEKLY_GOAL([type, value])
      this.SET_BOTTOM_SHEET(false)
    },

    numberFormat (p, s, m) {
      let saved = (p - ((p * s) / 100)) / m
      return saved.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
    },

    originalPriceFormat (n) {
      return n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
    },

    savedPrice (p, s, m) {
      let saved = (p - ((p * s) / 100)) / m
      return (p - ((saved) * m)).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
    },

    totalPrice (p, s, m) {
      let saved = (p - ((p * s) / 100)) / m
      let _totalPrice = ((saved) * m).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
      this.SET_TOTAL_PRICE(_totalPrice)
      return _totalPrice
    },

    toggleSheet(bool, title) {
      let capitalizedTitle = title[0].toUpperCase() + title.substring(1)
      this.setBottomSheetList = title
      this.SET_BOTTOM_SHEET(bool)
      return this.bottomSheetTitle = capitalizedTitle
    },

    setDedicatePlan_RadioBtn(key, [_duration, _totalPrice]) {
      this.SET_RADIO_BTN(key)
      this.SET_DEDICATE_PLAN([_duration, _totalPrice])
    },
  },

  components: {
    Header,
    BottomButton,
    BottomSheet,
  },

}
</script>

<style lang="scss" scoped>
#subscribe {
  .bold {
    font-weight: 700;
  }

  .bottomsheet {
    .bottomsheet__list {
      cursor: pointer;
      height: $grid12x;

      .bottomsheet__text {
        color: $black78 !important;
        @include line-height($grid7x);
      }
    }
  }

  .subscribe__section {
    padding: $header $grid4x 0;

    &.bottom {
      padding: 0 $grid4x $grid8x;

      .bottom__condition {
        .bottom__condition-text {
          color: $white54;
          text-align: center;
          @include font-size($grid3x);

          &.bottomtext {
            margin-bottom: -#{$grid3x};
          }
        }
      }
    }

    .section__border {
      margin-bottom: $grid6x;
      padding-bottom: $grid6x;
      border-bottom: 1px solid $white38;
    }

    .subscribe__box {
      .section__title {
        width: 100%;
        font-weight: 700;
        height: $grid12x;
        @include font-size($grid4x);

        p {
          @include line-height($grid7x);
        }
      }

      .section__combobox {
        width: 100%;
        cursor: pointer;
        height: $grid12x;
        position: relative;

        .section__combobox-box {
          display: inline-block;
          position: absolute;
          width: calc(100% - #{$grid12x});

          p {
            width: calc(100% - #{$grid12x});
            @include font-size($grid4x);
            @include line-height($grid2x);
          }
        }

        .section__combobox-icon {
          right: 0;
          width: $grid12x;
          height: $grid12x;
          position: absolute;
          display: inline-block;

          i {
            float: right;
            padding-top: $grid;
            @include font-size($grid6x);
          }
        }
      }

      .section__radiobox {
        transform: translateY(-#{$grid4x});

        .section__radiobox-box {
          cursor: pointer;

          .section__radiobox-left {
            width: 65%;
            display: inline-block;

            .section__radiobox-left-left {
              width: $grid8x;
              vertical-align: top;
              display: inline-block;

              i {
                width: $grid12x;
                transform: translateY($grid);
              }
            }

            .section__radiobox-left-right {
              vertical-align: top;
              display: inline-block;
              width: calc(100% - #{$grid8x});

              .section__radiobox-text {
                font-weight: 700;

                @include font-size($grid4x);
                @include line-height($grid);
              }

              .section__radiobox-renews {
                color: $white54;
                padding-top: -#{$grid4x};
                @include font-size(14px);
                @include line-height($grid2x);
              }

              .section__radiobox-ratebox {
                color: $brand;
                font-weight: 700;
                display: inline-block;
                padding: $grid $grid3x;
                background-color: #fff;
                @include border-radius();
                @include font-size($grid3x);
              }
            }
          }

          .section__radiobox-right {
            width: 35%;
            text-align: right;
            display: inline-block;

            .section__radiobox-price {
              font-weight: 700;
              vertical-align: top;
              transform: translateY(6px);
              @include font-size($grid4x);

              &::before {
                content: '₩';
              }

              &::after {
                color: $white54;
                content: ' / mo.';
                @include font-size($grid3x);
              }
            }
          }
        }
      }

      .section__summarybox {
        .section__summarybox-box {
          .section__summarybox-text {
            color: $white54;
            @include font-size(14px);

            &.bottomtext {
              margin-top: -#{$grid2x};
              margin-bottom: -#{$grid3x};
            }

            span {
              @include font-size(14px);
            }
          }

          .section__summarybox-price,
          .section__summarybox-total {
            text-align: left;
            width: calc(100%);
            display: inline-block;
            @include line-height(0px);

            span {
              width: 50%;
              display: block;
              text-align: right;
              float: right !important;
              @include line-height(0px);
            }
          }

          .section__summarybox-total {
            font-weight: 700;
            @include font-size(18px);

            span {
              font-weight: 700;
              @include font-size(18px);
            }
          }
        }
      }
    }
  }
}
</style>
