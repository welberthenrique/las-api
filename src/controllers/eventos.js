const Evento = require("../models/eventos");

module.exports = (app) => {
  app.get("/eventos", (_req, res, next) => {
    Evento.listar()
      .then((resultados) => res.json(resultados))
      .catch((erros) => next(erros));
  });

  app.get("/eventos/:id", (req, res, next) => {
    const id = parseInt(req.params.id);
    Evento.buscarPorId(id)
      .then((resultados) => res.json(resultados))
      .catch((erros) => next(erros));
  });

  app.post("/eventos", (req, res, next) => {
    const eventos = req.body;
    Evento.adicionar(eventos)
      .then((resultados) =>
        res.status(201).json({ id: resultados.insertId, ...eventos })
      )
      .catch((erros) => next(erros));
  });

  app.put("/eventos/:id", (req, res, next) => {
    const id = parseInt(req.params.id);
    const valores = req.body;
    Evento.alterar(id, valores)
      .then(() => res.json({ id, ...valores }))
      .catch((erros) => next(erros));
  });

  app.delete("/eventos/:id", (req, res, next) => {
    const id = parseInt(req.params.id);
    Evento.excluir(id)
      .then(() => res.json({ id }).end())
      .catch((erros) => next(erros));
  });

  app.get("/eventos/status/:status", (req, res, next) => {
    const status = req.params.status;
    Evento.buscaPorStatus(status)
      .then((resultados) => res.json(resultados))
      .catch((erros) => next(erros));
  });

  app.get("/eventos/nome/:nome", (req, res, next) => {
    const nome = req.params.nome;
    Evento.buscarPorNome(nome)
      .then((resultados) => res.json(resultados))
      .catch((erros) => next(erros));
  });
};
