const UFs = require("../models/municipios.js");

module.exports = (app) => {
  app.get("/ufs/:uf/municipios", (req, res, next) => {
    const uf = req.params.uf;
    UFs.buscarMunicipio(uf)
      .then((resultados) => res.json(resultados))
      .catch((erros) => next(erros));
  });
};
