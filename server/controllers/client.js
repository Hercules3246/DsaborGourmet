const Clie = require("../models/client");

function updateClient(req, res) {
  const clientData = req.body;
  const { id } = req.params;

  Clie.findByIdAndUpdate(id, clientData, (err, clientUpdated) => {
    if (err) {
      res.status(500).send({ code: 500, message: "Error del servidor." });
    } else {
      if (!clientUpdated) {
        res
          .status(404)
          .send({ code: 404, message: "No se ha encontrado ningun cliente." });
      } else {
        res
          .status(200)
          .send({ code: 200, message: "Cliente actualizado correctamente." });
      }
    }
  });
}

function deleteClient(req, res) {
  const { id } = req.params;

  Clie.findByIdAndRemove(id, (err, clientDeleted) => {
    if (err) {
      res.status(500).send({ code: 500, message: "Error del servidor." });
    } else {
      if (!clientDeleted) {
        res.status(404).send({ code: 404, message: "Cliente no encontrado." });
      } else {
        res.status(200).send({
          code: 200,
          message: "El cliente ha sido eliminado correctamente.",
        });
      }
    }
  });
}

function addClientAdmin(req, res) {
  const client = new Clie();
  const {
    idClient,
    name,
    businessName,
    phoneNumber,
    route,
    neighborhood,
  } = req.body;
  client.idClient = idClient;
  client.name = name.toLowerCase();
  client.businessName = businessName.toLowerCase();
  client.phoneNumber = phoneNumber.toLowerCase();
  client.route = route;
  client.neighborhood = neighborhood;
  client.active = true;

  client.save((err, clientStored) => {
    if (err) {
      res.status(500).send({ code: 500, message: "Error en el servidor" });
    } else {
      if (!clientStored) {
        res
          .status(400)
          .send({ code: 400, message: "No se ha podido crear el cliente." });
      } else {
        res
          .status(200)
          .send({ code: 200, message: "Cliente creado correctamente." });
      }
    }
  });
}

function activateClient(req, res) {
  const { id } = req.params;
  const { active } = req.body;

  Clie.findByIdAndUpdate(id, { active }, (err, clientStored) => {
    if (err) {
      res.status(500).send({ message: "Error del servidor." });
    } else {
      if (!clientStored) {
        res.status(404).send({ message: "No se ha encontrado el cliente." });
      } else {
        if (active === true) {
          res.status(200).send({ message: "Cliente activado correctamente." });
        } else {
          res
            .status(200)
            .send({ message: "Cliente desactivado correctamente." });
        }
      }
    }
  });
}

function searchClient(req, res) {
  const { page = 1, limit = 10 } = req.query;
  const query = req.query;
  const options = {
    page,
    limit: parseInt(limit),
    sort: { name: "asc" },
  };

  Clie.paginate(
    {
      name: { $regex: query.name.toLowerCase() },
      active: query.active,
    },
    options,
    (err, clientStored) => {
      if (err) {
        res.status(500).send({ code: 500, message: "Error del servidor." });
      } else {
        if (!clientStored) {
          res.status(404).send({
            code: 404,
            message: "No se ha encontrado ningun cliente con ese nombre.",
          });
        } else {
          res.status(200).send({ code: 200, clients: clientStored });
        }
      }
    }
  );
}

module.exports = {
  updateClient,
  deleteClient,
  addClientAdmin,
  activateClient,
  searchClient,
};
