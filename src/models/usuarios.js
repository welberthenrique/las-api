const fetch = require("node-fetch");
const repositorio = require("../repositorios/usuario");

class Usuarios {
  listar() {
    return repositorio.listar();
  }

  buscarPorId(id) {
    return repositorio.buscarPorId(id);
  }

  async adicionar(usuario) {
    let nomeEhValido = false;

    if (usuario?.nome?.length > 0) {
      const nomeJaUtilizado = await repositorio.isNomeUsuarioUtilizado(
        usuario.nome
      );

      if (!nomeJaUtilizado) {
        nomeEhValido = true;
      }
    }

    const urlEhValida = await this.isURLValida(usuario?.urlFotoPerfil);

    const validacoes = [
      {
        nome: "nome",
        valido: nomeEhValido,
        mensagem: "Nome deve ser informado e deve ser único",
      },
      {
        nome: "urlFotoPerfil",
        valido: urlEhValida,
        mensagem: "URL deve ser uma URL válida",
      },
    ];

    const erros = validacoes.filter((campo) => !campo.valido);
    const existemErros = erros.length;

    if (existemErros) {
      throw new Error("Status: " + 404);
    } else {
      const resp = await repositorio.adicionar(usuario);
      return { id: resp.insertId, ...usuario };
    }
  }

  alterar(id, valores) {
    return repositorio.alterar(id, valores);
  }

  excluir(id) {
    return repositorio.excluir(id);
  }

  buscarPorNome(nome) {
    return repositorio.buscarPorNome(nome);
  }

  async isURLValida(url) {
    try {
      const regex =
        /https?:\/\/(www.)?[-a-zA-Z0-9@:%.+~#=]{1,256}.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%+.~#?&/=]*)/gm;
      const verificaUrl = url.match(regex);
      if (!verificaUrl) {
        return false;
      }
      const response = await fetch(url);
      return response.status === 200;
    } catch {
      return false;
    }
  }

  obterDadosPessoais(id) {
    return repositorio.obterDadosPessoais(id);
  }
  atualizarDadosPessoais(id, dadosPessoais) {
    return repositorio.atualizarDadosPessoais(id, dadosPessoais);
  }

  buscarContatos(id) {
    return repositorio.buscarContatos(id);
  }

  alterarContatos(id, valores) {
    return repositorio.alterarContatos(id, valores);
  }

  alterarSenha(id, senhaAlterada) {
    return repositorio.alterarSenha(id, senhaAlterada);
  }

  buscarEndereco(id) {
    return repositorio.buscarEndereco(id);
  }

  alterarEndereco(id, valores) {
    return repositorio.alterarEndereco(id, valores);
  }
}

module.exports = new Usuarios();
