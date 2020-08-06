const Rou = require("../models/route");

// function getRouteActive(req, res) {
//   const { page = 1, limit = 10 } = req.query; //req.queryes cuando enviamos parametros desde la url
//   const query = req.query;
//   const options = {
//     page,
//     limit: parseInt(limit),
//     sort: { date: "desc" },
//   };
//   Rou.paginate({ active: query.active }, options, (err, postsStored) => {
//     if (err) {
//       res.status(500).send({ code: 500, message: "Error del servidor." });
//     } else {
//       if (!postsStored) {
//         res
//           .status(404)
//           .send({ code: 404, message: "No se ha encontrado ningun Producto." });
//       } else {
//         res.status(200).send({ code: 200, posts: postsStored });
//       }
//     }
//   });
// }

function updateRoute(req, res) {
  const routeData = req.body;
  const { id } = req.params;

  Rou.findByIdAndUpdate(id, routeData, (err, routeUpdate) => {
    if (err) {
      res.status(500).send({ code: 500, message: "Error del servidor." });
    } else {
      if (!routeUpdate) {
        res
          .status(404)
          .send({ code: 404, message: "No se ha encontrado ninguna ruta." });
      } else {
        res
          .status(200)
          .send({ code: 200, message: "Ruta actualizada correctamente." });
      }
    }
  });
}

function deleteRoute(req, res) {
  const { id } = req.params;

  Rou.findByIdAndRemove(id, (err, routeDeleted) => {
    if (err) {
      res.status(500).send({ code: 500, message: "Error del servidor." });
    } else {
      if (!routeDeleted) {
        res.status(404).send({ code: 404, message: "Ruta no encontrada." });
      } else {
        res.status(200).send({
          code: 200,
          message: "La ruta ha sido eliminado correctamente.",
        });
      }
    }
  });
}

function addRouteAdmin(req, res) {
  const rou = new Rou();
  const { name, description, dia } = req.body;
  rou.name = name.toLowerCase();
  rou.description = description.toLowerCase();
  rou.dia = dia;
  rou.active = true;

  rou.save((err, routeStored) => {
    if (err) {
      res.status(500).send({ code: 500, message: "Error en el servidor" });
    } else {
      if (!routeStored) {
        res
          .status(400)
          .send({ code: 400, message: "No se ha podido crear la ruta." });
      } else {
        res
          .status(200)
          .send({ code: 200, message: "Ruta creada correctamente." });
      }
    }
  });
}

function activateRoute(req, res) {
  const { id } = req.params;
  const { active } = req.body;

  Rou.findByIdAndUpdate(id, { active }, (err, routeStored) => {
    if (err) {
      res.status(500).send({ message: "Error del servidor." });
    } else {
      if (!routeStored) {
        res.status(404).send({ message: "No se ha encontrado la ruta." });
      } else {
        if (active === true) {
          res.status(200).send({ message: "Ruta activada correctamente." });
        } else {
          res.status(200).send({ message: "Ruta desactivada correctamente." });
        }
      }
    }
  });
}

function searchRoute(req, res) {
  const { page = 1, limit = 10 } = req.query;
  const query = req.query;
  const options = {
    page,
    limit: parseInt(limit),
    sort: { name: "asc" },
  };

  Rou.paginate(
    {
      name: { $regex: query.name.toLowerCase() },
      active: query.active,
    },
    options,
    (err, routesStored) => {
      if (err) {
        res.status(500).send({ code: 500, message: "Error del servidor." });
      } else {
        if (!routesStored) {
          res.status(404).send({
            code: 404,
            message: "No se ha encontrado ninguna ruta con ese nombre.",
          });
        } else {
          res.status(200).send({ code: 200, routes: routesStored });
        }
      }
    }
  );
}

module.exports = {
  updateRoute,
  deleteRoute,
  addRouteAdmin,
  activateRoute,
  searchRoute,
};
