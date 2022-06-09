const repositorio = require("../repositorios/municipio");

class Municipios {
  async buscarMunicipio(listaUf) {
    const listaMunicipio = await repositorio.buscarMunicipio(listaUf);
    return listaMunicipio.map((municipio) => municipio.nome);
  }
}

module.exports = new Municipios();
