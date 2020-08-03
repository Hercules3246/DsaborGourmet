const Prod = require("../models/product");

function getProductActive(req, res) {
  const { page = 1, limit = 10 } = req.query; //req.queryes cuando enviamos parametros desde la url
  const query = req.query;
  const options = {
    page,
    limit: parseInt(limit),
    sort: { date: "desc" },
  };
  Prod.paginate({ active: query.active }, options, (err, postsStored) => {
    if (err) {
      res.status(500).send({ code: 500, message: "Error del servidor." });
    } else {
      if (!postsStored) {
        res
          .status(404)
          .send({ code: 404, message: "No se ha encontrado ningun Producto." });
      } else {
        res.status(200).send({ code: 200, posts: postsStored });
      }
    }
  });
}

function updateProduct(req, res) {
  const prodData = req.body;
  const { id } = req.params;

  Prod.findByIdAndUpdate(id, prodData, (err, prodUpdate) => {
    if (err) {
      res.status(500).send({ code: 500, message: "Error del servidor." });
    } else {
      if (!prodUpdate) {
        res
          .status(404)
          .send({ code: 404, message: "No se ha encontrado ningun producto." });
      } else {
        res
          .status(200)
          .send({ code: 200, message: "Producto actualizado correctamente." });
      }
    }
  });
}

function deleteProd(req, res) {
  const { id } = req.params;

  Prod.findByIdAndRemove(id, (err, prodDelete) => {
    if (err) {
      res.status(500).send({ code: 500, message: "Error del servidor." });
    } else {
      if (!prodDelete) {
        res.status(404).send({ code: 404, message: "Producto no encontrado." });
      } else {
        res.status(200).send({
          code: 200,
          message: "El producto ha sido eliminado correctamente.",
        });
      }
    }
  });
}

function addProductAdmin(req, res) {
  const prod = new Prod();
  const { name, description, price, stock } = req.body;
  prod.name = name.toLowerCase();
  prod.description = description.toLowerCase();
  prod.price = price;
  prod.stock = stock;
  prod.active = true;

  prod.save((err, prodStored) => {
    if (err) {
      res.status(500).send({ code: 500, message: "Error en el servidor" });
    } else {
      if (!prodStored) {
        res
          .status(400)
          .send({ code: 400, message: "No se ha podido crear el Producto." });
      } else {
        res
          .status(200)
          .send({ code: 200, message: "Producto creado correctamente." });
      }
    }
  });
}

function activateProd(req, res) {
  const { id } = req.params;
  const { active } = req.body;

  Prod.findByIdAndUpdate(id, { active }, (err, userStored) => {
    if (err) {
      res.status(500).send({ message: "Error del servidor." });
    } else {
      if (!userStored) {
        res.status(404).send({ message: "No se ha encontrado el producto." });
      } else {
        if (active === true) {
          res.status(200).send({ message: "Producto activado correctamente." });
        } else {
          res
            .status(200)
            .send({ message: "Producto desactivado correctamente." });
        }
      }
    }
  });
}

function searchProd(req, res) {
  const { name } = req.body;
}

module.exports = {
  updateProduct,
  deleteProd,
  getProductActive,
  addProductAdmin,
  activateProd,
};
