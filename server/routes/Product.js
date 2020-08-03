const express = require("express");
const ProductController = require("../controllers/Product");

const md_auth = require("../middlewares/authenticated");

const api = express.Router();

api.get("/product-active", ProductController.getProductActive);
api.post(
  "/add-product-admin",
  [md_auth.ensureAuth],
  ProductController.addProductAdmin
);
api.put(
  "/update-product/:id",
  [md_auth.ensureAuth],
  ProductController.updateProduct
);
api.put(
  "/activate-prod/:id",
  [md_auth.ensureAuth],
  ProductController.activateProd
);
api.delete(
  "/delete-product/:id",
  [md_auth.ensureAuth],
  ProductController.deleteProd
);

module.exports = api;
