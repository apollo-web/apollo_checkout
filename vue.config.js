module.exports = {
  css: {
    loaderOptions: {
      sass: {
        data: `
                  @import "@/styles/style.scss";
                `
      },
    },
  },
  devServer: {
    port: 3030,
  }
}
