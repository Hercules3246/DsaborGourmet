const express = require("express");
const ClientController = require("../controllers/client");

const md_auth = require("../middlewares/authenticated");

const api = express.Router();

api.post(
  "/add-client-admin",
  [md_auth.ensureAuth],
  ClientController.addClientAdmin
);
api.put(
  "/update-client/:id",
  [md_auth.ensureAuth],

  ClientController.updateClient
);
api.put(
  "/activate-client/:id",
  [md_auth.ensureAuth],
  ClientController.activateClient
);
api.delete(
  "/delete-client/:id",
  [md_auth.ensureAuth],
  ClientController.deleteClient
);
api.get("/client-search", ClientController.searchClient);

module.exports = api;
