module.exports = {
  routes: [
    {
      method: "DELETE",
      path: "/offers/delete-all",
      handler: "offer.deleteAll",
    },
    {
      method: "POST",
      path: "/offers/buy",
      handler: "offer.buy",
    },
  ],
};
