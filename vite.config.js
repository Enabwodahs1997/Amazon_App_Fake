export default {
  root: ".",
  appType: "mpa",
  server: {
    open: "/main.html"
  },
  build: {
    rollupOptions: {
      input: {
        main: "main.html",
        checkout: "checkout/checkout.html",
        product: "Products/product.html"
      }
    }
  }
};
