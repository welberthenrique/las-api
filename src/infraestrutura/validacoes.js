async function isURLValida(url) {
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

module.exports = { isURLValida };
