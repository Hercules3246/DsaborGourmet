const express = require("express");
const ProductController = require("../controllers/Product");

const md_auth = require("../middlewares/authenticated");

const api = express.Router();

api.get("/get-products", ProductController.getProduct);
api.get("/get-product/:id", ProductController.getProd);
api.post("/add-product", [md_auth.ensureAuth], ProductController.addProduct);
api.put(
  "/update-product/:id",
  [md_auth.ensureAuth],
  ProductController.updateProduct
);
api.delete(
  "/delete-product/:id",
  [md_auth.ensureAuth],
  ProductController.deleteProd
);

module.exports = api;
