const jwt = require("jwt-simple");
const moment = require("moment");

const SECRET_KEY = "gR7cH9Svfj8JLe4c186Ghs48hheb3902nh5DsA";

exports.ensureAuth = (req, res, next) => {
  if (!req.headers.authorization) {
    //si la peticion viene sin cabecera
    return res
      .status(403)
      .send({ message: "La peticion no tiene la cabecera de Autenticacion." });
  }

  const token = req.headers.authorization.replace(/['"]+/g, ""); //limpiamos el token

  try {
    var payload = jwt.decode(token, SECRET_KEY);

    if (payload.exp <= moment().unix()) {
      //si la fecha de expiracion esta expirada
      return res.status(404).send({ message: "El token ha expirado." });
    }
  } catch (ex) {
    //si el token es invalido
    console.log(ex);
    return res.status(404).send({ message: "Token invalido." });
  }
  req.user = payload; //devolvemos el token y con next damos paso
  next();
};
