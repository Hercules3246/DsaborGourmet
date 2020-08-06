const express = require("express");
const RouteController = require("../controllers/route");

const md_auth = require("../middlewares/authenticated");

const api = express.Router();

// api.get("/route-active", RouteController.getRouteActive);
api.post(
  "/add-route-admin",
  [md_auth.ensureAuth],
  RouteController.addRouteAdmin
);
api.put("/update-route/:id", [md_auth.ensureAuth], RouteController.updateRoute);
api.put(
  "/activate-route/:id",
  [md_auth.ensureAuth],
  RouteController.activateRoute
);
api.delete(
  "/delete-route/:id",
  [md_auth.ensureAuth],
  RouteController.deleteRoute
);
api.get("/route-search", RouteController.searchRoute);

module.exports = api;
