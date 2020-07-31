const Prod = require("../models/product");

function addProduct(req, res) {
  const body = req.body;
  const prod = new Prod(body);

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

function getProduct(req, res) {
  const { page = 1, limit = 10 } = req.query; //req.queryes cuando enviamos parametros desde la url

  const options = {
    page,
    limit: parseInt(limit),
    sort: { date: "desc" },
  };
  Prod.paginate({}, options, (err, postsStored) => {
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

function getProductActive(req, res) {
  const query = req.query;

  Prod.find({ active: query.active }).then((prod) => {
    if (!prod) {
      res.status(404).send({ message: "No se ha encontrado ningun Producto." });
    } else {
      res.status(200).send({ prod });
    }
  });
}

module.exports = {
  addProduct,
  getProduct,
  updateProduct,
  deleteProd,
  getProductActive,
};
