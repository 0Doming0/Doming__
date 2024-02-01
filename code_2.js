const dados= {
    1:"um",
    2:"dois",
    3:"tres",
    4:"quatro"
}

module.exports = {
    App: (chave)=>{chave= ''+chave;
      if (Object.keys(dados).includes(chave))
        return dados[chave]
      else return 'Sem resultado para essa chave';
    }
  }
 