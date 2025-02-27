const repositorio = require("../repositorios/evento");
const moment = require("moment");

class Eventos {
  listar() {
    return repositorio.listar();
  }

  buscarPorId(id) {
    return repositorio.buscarPorId(id);
  }

  async adicionar(evento) {
    const dataEhValida = this.isDatasValidas(evento.dataInicio, evento.dataFim);

    const validacoes = [
      {
        nome: "data",
        valido: dataEhValida,
        mensagem: "Data do Evento invalida.",
      },
    ];

    if (!dataEhValida) {
      return Promise.reject(validacoes[0]);
    } else {
      return repositorio.adicionar(evento);
    }
  }

  alterar(id, valores) {
    return repositorio.alterar(id, valores);
  }

  excluir(id) {
    return repositorio.excluir(id);
  }

  buscaPorStatus(status) {
    return repositorio.buscaPorStatus(status);
  }

  buscarPorNome(nome) {
    return repositorio.buscarPorNome(nome);
  }

  isDatasValidas({ dataInicio, dataFim }) {
    const day = moment().format("YYYY-MM-DD");
    const objDataInicio = moment(dataInicio).format("YYYY-MM-DD");
    const objDataFim = moment(dataFim).format("YYYY-MM-DD");

    return (
      moment(objDataInicio).isSameOrAfter(day) &&
      moment(objDataFim).isSameOrAfter(objDataInicio)
    );
  }
}

module.exports = new Eventos();
