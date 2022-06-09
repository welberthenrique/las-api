const Usuario = require("../models/usuarios");

module.exports = (app) => {
  app.get("/usuarios", (_req, res, next) => {
    Usuario.listar()
      .then((resultados) => res.json(resultados))
      .catch((erros) => next(erros));
  });

  app.get("/usuarios/:id", (req, res, next) => {
    const id = parseInt(req.params.id);
    Usuario.buscarPorId(id)
      .then((usuario) => (usuario ? res.json(usuario) : res.status(404).send()))
      .catch((erros) => next(erros));
  });

  app.post("/usuarios", (req, res) => {
    const usuarios = req.body;
    Usuario.adicionar(usuarios)
      .then((resultados) => res.status(201).json(resultados))
      //.catch((erros) => next(erros));
      .catch((erros) => res.status(400).json(erros));
  });

  app.put("/usuarios/:id", (req, res, next) => {
    const id = parseInt(req.params.id);
    const valores = req.body;
    Usuario.alterar(id, valores)
      .then(() => res.json({ id, ...valores }))
      .catch((erros) => next(erros));
  });

  app.delete("/usuarios/:id", (req, res, next) => {
    const id = parseInt(req.params.id);
    Usuario.excluir(id)
      .then((resultados) =>
        resultados ? res.status(204).end() : res.status(404).end()
      )
      .catch((erros) => next(erros));
  });

  app.get("/usuarios/nome/:nome", (req, res, next) => {
    const nome = req.params.nome;
    Usuario.buscarPorNome(nome)
      .then((resultados) => res.json(resultados))
      .catch((erros) => next(erros));
  });

  app.get("/usuarios/:id/dados-pessoais", (req, res, next) => {
    const id = parseInt(req.params.id);
    Usuario.obterDadosPessoais(id)
      .then((usuario) => (usuario ? res.json(usuario) : res.status(404).send()))
      .catch((erros) => next(erros));
  });

  app.put("/usuarios/:id/dados-pessoais", (req, res, next) => {
    const id = parseInt(req.params.id);
    const valores = req.body;
    Usuario.atualizarDadosPessoais(id, valores)
      .then(() => res.json({ id, ...valores }))
      .catch((erros) => next(erros));
  });

  app.get("/usuarios/:id/contatos", (req, res, next) => {
    const id = parseInt(req.params.id);
    Usuario.buscarContatos(id)
      .then((usuario) => (usuario ? res.json(usuario) : res.status(404).send()))
      .catch((erros) => next(erros));
  });

  app.put("/usuarios/:id/contatos", (req, res, next) => {
    const id = parseInt(req.params.id);
    const valores = req.body;
    Usuario.alterarContatos(id, valores)
      .then(() => res.json({ id, ...valores }))
      .catch((erros) => next(erros));
  });

  app.put("/usuarios/:id/senha", (req, res, next) => {
    const id = parseInt(req.params.id);
    const valores = req.body;
    Usuario.alterarContatos(id, valores)
      .then(() => res.json({ id, status: "senha alterada com sucesso." }))
      .catch((erros) => next(erros));
  });

  app.get("/usuarios/:id/endereco", (req, res, next) => {
    const id = parseInt(req.params.id);
    Usuario.buscarEndereco(id)
      .then((usuario) => (usuario ? res.json(usuario) : res.status(404).send()))
      .catch((erros) => next(erros));
  });

  app.put("/usuarios/:id/endereco", (req, res, next) => {
    const id = parseInt(req.params.id);
    const valores = req.body;
    Usuario.alterarEndereco(id, valores)
      .then(() => res.json({ id, ...valores }))
      .catch((erros) => next(erros));
  });
};
