const express = require("express");
const router = express.Router();

class ListingsRouter {
  constructor(controller, auth) {
    this.controller = controller;
    this.auth = auth;
  }
  routes() {
    // we will insert routes into here later on
    router.get("/all", this.controller.allThrough.bind(this.controller));
    router.get(
      "/one/:listingId",
      this.controller.oneThrough.bind(this.controller)
    );

    router.get("/", this.controller.getAll.bind(this.controller));
    router.post(
      "/",
      this.auth,
      this.controller.insertOne.bind(this.controller)
    );
    router.get("/:listingId", this.controller.getOne.bind(this.controller));

    router.put(
      "/:listingId/buy",
      this.auth,
      this.controller.buyItem.bind(this.controller)
    );
    return router;
  }
}

module.exports = ListingsRouter;
