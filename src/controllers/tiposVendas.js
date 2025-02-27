const TipoVenda = require("../models/tiposVendas");

module.exports = (app) => {
  app.get("/tipos-venda", (_req, res, next) => {
    TipoVenda.listar()
      .then((resultados) => res.json(resultados))
      .catch((erros) => next(erros));
  });

  app.get("/tipos-venda/:id", (req, res, next) => {
    const id = parseInt(req.params.id);
    TipoVenda.buscarPorId(id)
      .then((resultados) => res.json(resultados))
      .catch((erros) => next(erros));
  });

  app.post("/tipos-venda", (req, res, next) => {
    const tiposVendas = req.body;
    TipoVenda.adicionar(tiposVendas)
      .then((resultados) =>
        res.status(201).json({ id: resultados.insertId, ...tiposVendas })
      )
      .catch((erros) => next(erros));
  });

  app.put("/tipos-venda/:id", (req, res, next) => {
    const id = parseInt(req.params.id);
    const valores = req.body;
    TipoVenda.alterar(id, valores)
      .then(() => res.json({ id, ...valores }))
      .catch((erros) => next(erros));
  });

  app.delete("/tipos-venda/:id", (req, res, next) => {
    const id = parseInt(req.params.id);
    TipoVenda.excluir(id)
      .then((resultado) =>
        resultado ? res.json({ id }).end() : res.stauts(204).end()
      )
      .catch((erros) => next(erros));
  });
};
