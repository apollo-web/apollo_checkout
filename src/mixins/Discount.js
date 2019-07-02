export const Discount = (o, r, m) => ({
  methods: {
    Discount() {
      return o - (o * r / 100) / m
    }
  },

})
