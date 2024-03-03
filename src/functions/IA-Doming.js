const fs = require("fs");
let letras_var = ["","q","w","e","r","t","y","u","i","o","p","a","s","d","f","g","h","j","k","l","z","x","c","v","b","n","m"];
var restaurant_DATA = {
  restaurant : "Lacro",
  product : "Hamburgueres"
};
const dados = {
  "ola":1,
  "oi":1,
  "bom dia":1,
  "boa noite":1,
  "boa tarde":1,
  "tudo pronto":1,
  "como vai":1,
  "tudo bem":1,
  "tudo bom":1,
  
  "ver":2, 
  "veja":2,
  
  "queria":3,
  "querer":3,
  "quero":3,
  "gostaria que":3,
  "gostaria":3,
  "quero que":3,
  "solicito que":3,
  "desejo que":3,
  "exijo que":3,
  "requereria que":3,
  "me entregue":3,
  "me de":3,
  "de me":3,
  "me dar":3,
  "me ve":3,
  "ve":3,
  "me envie":3,
  "Me diga":3,
  "Diga me":3,
  "Me todas":3,
  "organize":3,
  "me recomende":3,
  "enviar":3,
  "tem que":3,
  "chame":3,
  "manda":3,
  "me manda":3,
  "me desse":3,
  "me entregar":3,
  "encomende":3,
  "me mostre":3,
  "mostre":3,
  
  "pode providenciar":4,
  "posso pedir":4,
  "seria possivel":4,
  "peço que":4,
  "ficaria grato se":4,
  "por favor":4,
  "por gentileza":4,
  "gentileza":4,
  "sera que poderia":4,
  "poderia por favor":4,
  "poderia":4,
  "é possível":4,
  "pode que":4,
  "posso":4,
  
  "heineken":5,
  "xbuguer":5,
  "combo":5,
  "sal":5,
  "hamburguer":5,
  
  
  "todos":6,
  "todas":6,
  "pouco":6,
  
  "cardápio":7,
  "lista":7,
  "menu":7,
  "opções":7,
  "especialidade":7,
  "especiarias":7,
  "produto":7,
  
  "o que":8,
  
  "há":8,
  "quais são":8,
  "qual":8,
  "quais":8,
  "sera que":8,
  "pergunta":8,
  "diga":8,
  "fale":8,
  
  
  "quando":9,
  "me quando":9,
  
  "quanto":10,
  "quantas":10,
  
  "tempo":11,
  "hoje":11,
  "demorar":11,
  
  "chegar":12,
  "chega":12,
  "entrega":12,
  "chegaram":12,
  
  "restaurante":13,
  "casa":13,
  "loja":13,
  "quiosque":13,
  "quioske":13,
  "kioske":13,
  
  "barraca":13,
  
  "terei meu":14,
  "meus":14,
  "meu":14,
  "cliente":14,
  "freguês":14,
  "eu":14,
  "estou":14,
  "comigo":14,
  "para mim":14,
  
  "mais bem":15,
  "melhores":15,
  "top":15,
  "melhor":15,
  "uma boa":15,
  "um bom":15,
  "bemavaliados":15,
  "agradavel":15,
  "mais falado":15,
  
  "queijo":16,
  "linguiça":16,
  
  "preco":17,
  "precos":17,
  "valor":17,
  "valo":17,
  
  "me avisase":18,
  "avisasse":18,
  "avisar":18,
  "me avisar":18,
  "me notificar":18,
  "me notifique":18,
  
  "ate":19,
  "limite":19,
  "sem lactose":19,
  "sem gluten":19,
  
  "pedido":20,
  "minha refeicao":20,
  "meu almoco":20,
  "meu jantar":20,
  "meu lanche":20,
  
  "você":21,
  "inteligencia artificial":21,
  "ia":21,
  "doming":21,
  
  "mente":22,
  "consciente":22,
  "consciencia":22,
  "pensa":22,
  
  "pode fazer":23,
  "posso fazer":23,
  
  "necessito que":24,
  "preciso":24,
  "precisamos":24,
  "necessitamos":24,
  
  "abrir":25,
  
  "fome":26,
  "sede":26,
  
  "para quem":27,
  
  "tem":28,
  "tem algo":28,
  "tem alguma":28,
  "que tem":28,
  "ha algo":28,
  
  "complementos":29,
  "acompanhamentos":29,
  "colocar":30,
  "pode colocar":30,
  "acrescentar":30,
  "mais um":30,
  "adicionar":30,
  "manda mais":30,
  "quero mais":30,
  "pode mandar":30,
  "de mais":30,
  "botar":30,
  "alterar":31,
  "mudar":31,
  "botar outro":31,
  "Qualquer":32,
  "comida":33,
  "bebidas":33,
  "lanches":33,
  "pratos":33,
  "salgados":33,
  "sobremesas":33,
  "cervejas":33,
  "doces":33,
  "Qualquer comida":33,
  "refeição":33,
  "jantar":33,
  "almoco":33,
  "errado":34,
  "incerto":34,
  "problema":34,
  "problemático":34,
  "ruim":34,
  "mal":34,
  
  "classificação":35,
  "avaliados":35,
  "classificados":35,
  "ranting":35,
  "ranking":35,
  "relevante":35,
  
  "garçom":36,
  "atendente":36,
  
  "vai esgotar":37,
  "acabar":37,
  "vai acabar":37,
  
  "esperando":38,
  "aguardando":38,
  "espera":38,

  "promoções":39,
  "promocao":39,
  "desconto":39,
  
  "ok":40,
  "bom trabalho":40,
  "palavras_corretivo":["quem","tem","para"]
}
function dados_normalizados() {
  let new_dados = {};
  for (let item in dados) {
    new_dados[normalizar_texto(item, true, true)] = dados[item];
  }
  return new_dados;
}
// Verifica se palavra se integra em outra //
function verificar_compatibilidade(palavra) {
  for (let chave of dados["palavras_corretivo"]) {
    if (palavra.length < 5 && Array.from(chave).every(letra => palavra.includes(letra))) {
      return chave;
    }
  }
  return null;
}
// Otimiza palavras para serem encontradas //
function normalizar_palavras() {
  function texto(item, mode,show,locução_) {
    item = item.toLowerCase();
    let palavra = "";
    let letra_normalizador = { "á": "a", "ã": "a", "é": "e", "ê": "e", "ç": "c", "ú": "u", "õ": "o", "ó": "o", "-": " ", "í": "i"};
    let palavra_normalizador = {
        "pode":["poder","poderao","podem","podiam","peco","poderiam"],
        "fazer":["faz","fariam","fazem","fazeriam"],
        "notificar":["notifique"],
        "avisar":["avisasse","avise","avisa"],
        "entregar":["entregue","envie"],
        "abrir":["abrem","abre","abres"],
        "esperando":["aguardando"],
        "chega":["chegar","chegam","chegaram"],
        "algo":["algum","alguma","algun"],
        "gentileza":["getileza"],
        "chame":["chamar"],
        "manda":["mande","mandar"],
        "acabar":["esgotar","esgote","indisponivel"],
        "meve":["ve","vi","ver","viu"],
        "um":["uma"],
        "doming":["domain"],
        "tem":["tenho","tens","tenha"]

    };
    for (let letra of item) {
      if (!letras_var.includes(letra) && letra != " ") {
        if ("!?,.".includes(letra)) {
          palavra += " " + letra;
        } else if (letra in letra_normalizador) {
          palavra += letra_normalizador[letra];
        } else {
          palavra += letra;
        }
      } else {
        palavra += letra;
      }
    }
    let palavras = palavra.split(" ");
    
    for (let index = 0; index < palavras.length; index++) {
      if (!isNaN(palavras[index]) && palavras[index+1] == 'e' && !isNaN(palavras[index+2])) {
       palavras[index] += '.'+palavras[index+2]
       palavras.splice(index+1,2)
      }
      let bool = verificar_compatibilidade(palavras[index]);
      palavras[index] = bool !== null ? bool : palavras[index]; 
      for (let item in palavra_normalizador) {
        if (palavra_normalizador[item].includes(palavras[index])) {
          palavras[index] = item;
        }
      }
    }
    let palavra_normalizada = palavras;
    
    function verificar_float(string) {
      return !isNaN(parseFloat(string));
    }
    function separar_sequências(palavra_index, palavra_normalizada ,show) {
      if (locução_) return
      let locuções_adverbiais = [
        ["de","me"],["por","favor"],["me","de"],["bom","dia"],["me","dar"],["me","ve"],["me","diga"],["mais","bem"],
      ["gostaria","que"],["tudo","pronto"],["que","tem"],["uma","boa"],["um","bom"],["terei","meu"],["o","que"],["pode","fazer"],
      ["pode","que"],["diga","me"],["bem","avaliados"],["boa","noite"],["boa","tarde"],["quero","que"],["para","quem"],
      ["tem","que"],["posso","fazer"],["sera","que"],["meu","almoco"],["minha","refeicao"],["minha","comida"],["meu","lanche"],
      ["qualquer","comida"],["por","getileza"],["manda","mais"],["de","mais"],["inteligencia","artificial"],["vai","acabar"],["quero","mais"],
      ["mais","um"],["me","entregar"],["pode","mandar"],["para","mim"],["tudo","bem"],["tudo","bom"],["como","vai"],["ha","algo"],["bom","trabalho"],
      ["sem","lactose"],["sem","gluten"],["me","mostre"]
      ];
      let palavra_locução;
      if (palavra_index < palavra_normalizada.length - 2) {
        palavra_locução = [palavra_normalizada[palavra_index], palavra_normalizada[palavra_index + 1], palavra_normalizada[palavra_index + 2]];
      } else if (palavra_index == palavra_normalizada.length - 2) {
        palavra_locução = [palavra_normalizada[palavra_index], palavra_normalizada[palavra_index + 1]];
      } else {
        return palavra_normalizada;
      }
      function verificar_compatibilidade_locução(locução) {
        for (let index = 0; index < locução.length; index++) {
          if (palavra_locução[index] === locução[index]) {
            if (index > 0) return true;
            continue;
          } else {
            return false;
          }
        }
      }
      
      for (let locução of locuções_adverbiais) {
        if (verificar_compatibilidade_locução(locução)) {
          palavra_normalizada[palavra_index] += palavra_normalizada[palavra_index + 1];
          palavra_normalizada.splice(palavra_index + 1, 1);
          return palavra_normalizada;
        }
      }
      if (palavra_normalizada[palavra_index] == "me") {
        if (palavra_normalizada[palavra_index + 1].length > 3) {
          palavra_normalizada[palavra_index] += palavra_normalizada[palavra_index + 1];
          palavra_normalizada.splice(palavra_index + 1, 1);
          return palavra_normalizada;
        } else {
          palavra_normalizada[palavra_index] += "de";
          palavra_normalizada.splice(palavra_index + 1, 1);
          return palavra_normalizada;
        }
      }
      return palavra_normalizada;
    }
    if (!locução_) {
    for (let palavra_index = 0; palavra_index < palavra.length; palavra_index++) {
      if (palavra_index < palavra_normalizada.length) {
        palavra_normalizada = separar_sequências(palavra_index, palavra_normalizada,show);
      }
    }
  }
    if (mode) {
      let palavra_text = "";
      for (let item of palavra_normalizada) {
        let palavra_item = "";
        for (letra of item)
         if (!",.!? ".includes(letra))
          palavra_item += letra
        if (item != palavra_normalizada[palavra_normalizada.length -1])
        palavra_text += palavra_item+" ";
        else palavra_text += palavra_item;
      }
      return palavra_text;
    }
    return palavra_normalizada
  }

  function array(array) {
    let new_array = [];
    for (let item of array) {
      new_array.push(texto(item, true, true));
    }
    return new_array;
  }
  return {
    array: array,
    texto: texto,
  };
}
normalizar_texto = (mensagem,modo, show)=> normalizar_palavras().texto(mensagem,modo, show) 
normalizar_array = (array)=> normalizar_palavras().array(array) 

// * * * * - * * * * //
// Analiza a sequência de classes e da modelo de resposta //
function analizar_sequencia(...sequência) {
  sequência = sequência[0];
  return sequência;
}
// * * * * - * * * * //

// Traduz as palavras encontradas em classe //
function traduzir_chaves(chaves) {
  let new_chave_classe = [];
  let new_chave_ = [];
  const chave_classe = {
    1:"saudação",
        2:"observação",
        3:"exigência",
        4:"exigência-gentil",
        5:"tipo de comida",
        6:"quantidade",
        7:"menu",
        8:"pergunta",
        9:"pergunta-tempo",
        10:"pergunta-quantidade",
        11:"tempo",
        12:"entrega",
        13:"domicílio",
        14:"cliente",
        15:"melhores",
        16:"complemento",
        17:"preço",
        18:"avisar",
        19:"condição",
        20:"pedido",
        21:"IA",
        22:"IA-interação",
        23:"capacidade",
        24:"necessidade",
        25:"abertura",
        26:"status",
        27:"cliente-geral",
        28:"contém",
        29:"extras",
        30:"acrescentar",
        31:"alterar",
        32:"geral",
        33:"comida geral",
        34:"errado",
        35:"classificação",
        36:"atendente",
        37:"esgotar",
        38:"aguardar",
        39:"promoção",
        40:"resposta-animada",
  };
  for (let chave of chaves) {
    new_chave_classe.push(chave_classe[chave[1]]);
    new_chave_.push(chave[0])
  }
  return [new_chave_classe,new_chave_];
}
// Verifica se há um modelo pronto para texto
function verificar_ditados_próximos (ditado_usuário) {
  ditados_modelo = {
    "doming envie o melhor cardapio":"Exigir cardápio",
    "preciso de mais colher":"Exigir quantidade de comida",
    "doming mede todas a cervejas":"Recomendar comida",
    "doming ve 2 heineken":"Exigir quantidade de comida",
    "ve 2 heineken":"Exigir quantidade de comida",
    "encomende mais 2 hamburguer":"Exigir quantidade de comida",
    "mais um chopp":"Exigir quantidade de comida",
    "por favor metraga o cardapio":"Exigir cardápio",
    "qual e a sugestao do chef hoje":"Pergunta sobre comida",
    "voce pode recomendar um prato vegetariano":"Recomendar comida",
    "qual e a sopa do dia":"Pergunta sobre comida",
    "voce pode medizer quais pratos sao sem gluten":"Recomendar comida",
    "quais sao as opcoes veganas":"Recomendar comida",
    "voce pode metrazer mais guardanapos":"Exigir quantidade de comida",
    "voce pode meindicar um vinho tinto para acompanhar meu prato":"Recomendar comida",
    "qual e o prato mais popular do menu":"Recomendar comida",
    "quanto tempo vai levar para o meu pedido ficar pronto":"Tempo para aguardar",
    "voce tem opcoes de sobremesa sem lactose":"Exigir cardápio",
    "voce pode metrazer uma cadeira para meu filho":"Tarefa para restaurante",
    "existe a possibilidade de fazer alteracoes no prato":"Pergunta sobre dados restaurante",
    "qual e a politica de substituicoes":"Pergunta sobre dados restaurante",
    "voce pode medizer quais ingredientes estao no prato x":"Pergunta sobre comida",
    "ha alguma promocao ou desconto hoje":"Pergunta promoção",
    "voce pode metrazer um copo dagua":"Exigir quantidade de comida",
    "como esta o tempo de espera para uma mesa para duas pessoas":"Pergunta sobre dados restaurante",
    "voce pode embalar o que sobrou para viagem":"Tarefa para restaurante",
    "voce pode meinformar sobre as opcoes de comida sem lactose":"Recomendar comida",
    "posso fazer um pedido personalizado":"Pergunta sobre comida",
    "quais sao as opcoes de acompanhamentos disponiveis":"Recomendar comida",
    "voce pode merecomendar um prato leve":"Recomendar comida",
    "ha alguma taxa de servico adicional":"Pergunta sobre dados restaurante",
    "voce pode medizer quais pratos sao picantes":"Recomendar comida",
    "voce pode ajustar a temperatura do ar condicionado":"",
    "qual e o tamanho das porcoes":"Pergunta sobre comida",
    "a porcao vem quantas unidades":"Pergunta sobre comida",
    "voce pode metrazer mais pao":"Exigir quantidade de comida",
    "voce pode meinformar sobre as opcoes de bebidas nao alcoolicas":"Pergunta sobre comida",
    "qual e o prato do dia":"Pergunta sobre comida",
    "prato vegetariano alguma recomendação":"Recomendar comida",
    "prato gourmet alguma recomendação":"Recomendar comida",
    "diga os melhores produtos":"Recomendar comida",
    "meve um hamburguer":"Exigir quantidade de comida",
    "encomendar um hamburguer":"Exigir quantidade de comida",
    "quando terei meu pedido":"Pergunta tempo do pedido",
    "como vai o trabalho hoje":"Pergunta sobre dados restaurante",
    "como vão as vendas no restaurante":"Pergunta sobre dados restaurante",
  };
  function verificar_condição (classes) {
    const condições = {
        "Exigir cardápio": [classes.includes("exigência") || (classes.includes("condição") && classes.includes("quantidade")) || classes.includes("condição"),classes.includes("menu") || classes.includes("comida geral")],
        "Pergunta tempo do pedido":[classes.includes('pergunta-tempo'), classes.includes('cliente'), classes.includes('pedido')],
        "Exigir quantidade de comida":[classes.includes('exigência'), classes.includes('quantidade'), classes.includes('tipo de comida') && !classes.includes('menu')],
        "Tempo para aguardar":[classes.includes('tempo'),classes.includes('aguardar')],
        "Pergunta promoção":[classes.includes('contém') || classes.includes('pergunta'),classes.includes('promoção')],
        "Pergunta sobre comida":[],
        "Pergunta sobre dados restaurante":[],
        "Recomendar comida":[classes.includes("exigência"),classes.includes("melhores"), classes.includes("tipo de comida") || classes.includes("comida geral")],
        "Tarefa para restaurante":[],
        "Saudação":[classes.includes("saudação") || classes.includes("IA"),!classes.includes("exigência"),!classes.includes("exigência-gentil")],
    }
   let melhor_condição = []
   let número_acertos = 0
   for (condição of Object.keys(condições)) {   
    número_acertos = 0   
    for (index_sub_condição in condições[condição]) {
     if (condições[condição][index_sub_condição] == false)
      break
     else
      número_acertos += 1
      if (index_sub_condição == condições[condição].length-1)
       melhor_condição.push(condição)
    }
   }     
    return melhor_condição
  }
  function modelos_resposta(classes_modelo, classes, message) {
  const classes_valor = classes[1]
  classes = classes[0]
  classes_modelo = organizar_classes_modelo(classes_modelo)
  let condicoes_personalidade = [
      classes_modelo.includes("Pergunta tempo do pedido") || classes.includes("pergunta-tempo"),
      classes.includes("exigência-gentil") || classes.includes("pergunta-tempo") || classes.includes("saudação"),
      classes_modelo.includes("Pergunta tempo do pedido")
  ];
  let resposta_personalidade = [condicoes_personalidade[0] ? 1 : 0, condicoes_personalidade[1] ? 1 : 0, condicoes_personalidade[2] ? 1 : 0];

  let variacao_resposta = [
      {"Saudacao": ""},
      {
          "Saudacao": [["Olá,", "Boa noite,"],["Como posso te ajudar?","Que tipo de fome tem hoje no <restaurante>?"]],
          "Despedida": [["Fique a vontade para escolher :)", "Não tenha pressa! Escolha o que mais tenha vontade"], [`Obrigado por me confiar sua fome no ${restaurant_DATA.restaurant}", "Se gostou do meu atendimento, gostaria muito que falasse bem de mim por aí :)`]],
          "Conectivo": ["e estou encomendando", `e vou avisar ao ${restaurant_DATA.restaurant} sobre os`],
          "Conectivo-neutro": ["e estou"],
          "Interação": ["hoje serei seu garçom", "me diga qual seu tipo de fome."],
          "Cardápio-reference":["Aqui está o cardápio","Listei os produtos"]
      }
  ];
  function organizar_classes_modelo (classes_modelo) {
    let array = []
    const array_importancia = ['Saudação', "Exigir quantidade de comida","Exigir cardápio",'Pergunta sobre comida',"Recomendar comida","Tempo para aguardar", 'Pergunta promoção', 'Pergunta tempo do pedido',"Pergunta sobre dados restaurante","Tarefa para restaurante",]
    for (item of array_importancia)
     if (classes_modelo.includes(item))
      array.push(item)
    return array
  }
  function modelos_resposta (modo, text_status, despedida) {
    const classes_single = classes_modelo.length == 1
    const text_introdution = text_status == 'Saudacao' ? array_random(variacao_resposta[1][text_status][classes_modelo == ['Saudação'] ? 1 : 0]) : array_random(variacao_resposta[1][text_status])
    const text_recomendação = classes.includes('melhores') && classes.includes('menu')||classes.includes('comida geral') ? `os mais bem avaliados ${restaurant_DATA.product} do cardápio` : "pratos vegetarianos principais"
    const text_cardápio = classes.includes('condição') || (classes.includes('menu') || classes.includes('comida geral')) ? ` ${classes_valor[classes.indexOf('condição')] == 'semgluten' ? "de produtos sem glúten" : classes_valor[classes.indexOf('condição')] == 'semlactose' ? "de produtos sem lactose" : classes.includes('quantidade') && !isNaN(classes_valor[classes.indexOf('quantidade')]) ? ` de até R$${classes_valor[classes.indexOf('quantidade')]}` : classes.includes('comida geral') ? `de produtos ${classes_valor[classes.indexOf("comida geral")]}` : ''}`: ' com os principais produtos'
    let modelos_base = 
      {
        "Exigir cardápio": `${array_random(variacao_resposta[1]["Cardápio-reference"])}${text_cardápio}`,
        "Pergunta tempo do pedido": "Seu pedido chegará entre os próximos 10 minutos",
        "Exigir quantidade de comida": `Encomendando <quantidade> ${restaurant_DATA.product} ao ${restaurant_DATA.restaurant}`,
        "Tempo para aguardar": "Os pedidos geralmente ficam prontos em 10 minutos",
        "Pergunta promoção":`procurando nossos ${restaurant_DATA.product} em promoção`,
        "Pergunta sobre comida":`Esse ${restaurant_DATA.product} vem sem sal`,
        "Pergunta sobre dados restaurante":"Sim, estou pedindo ao restaurante para desligar ar condicionado",
        "Recomendar comida":`Vou te mostrar nossos ${text_recomendação} `,
        "Tarefa para restaurante":"Estou pedindo para um atendente pegar uma cadeira para você",
        "Saudação":"hoje serei seu garçom...!",
    };
    let modelos = 
      {
        "Exigir cardápio": `${text_introdution} ${modelos_base["Exigir cardápio"]} ${despedida ? array_random(variacao_resposta[1]['Despedida'][resposta_personalidade[2]]) : ''}`,
        "Pergunta tempo do pedido": `${text_introdution} ${modelos_base["Pergunta tempo do pedido"]} :) ${despedida ? array_random(variacao_resposta[1]['Despedida'][resposta_personalidade[2]]) : ''}`,
        "Exigir quantidade de comida": `${text_introdution} ${modelos_base["Exigir quantidade de comida"]} ${despedida ? array_random(variacao_resposta[1]['Despedida'][resposta_personalidade[2]]) : ''}`,
        "Tempo para aguardar": `${text_introdution} ${modelos_base["Tempo para aguardar"]}. ${despedida ? array_random(variacao_resposta[1]['Despedida'][resposta_personalidade[2]]) : ''}`,
        "Pergunta promoção":`${text_introdution} ${modelos_base["Pergunta promoção"]}. ${despedida ? array_random(variacao_resposta[1]['Despedida'][resposta_personalidade[2]]) : ''}`,
        "Pergunta sobre comida":`${text_introdution} ${modelos_base["Pergunta sobre comida"]}. ${despedida ? array_random(variacao_resposta[1]['Despedida'][resposta_personalidade[2]]) : ''}`,
        "Pergunta sobre dados restaurante":`${text_introdution} ${modelos_base["Pergunta sobre dados restaurante"]}. ${despedida ? array_random(variacao_resposta[1]['Despedida'][resposta_personalidade[2]]) : ''}`,
        "Recomendar comida":`${text_introdution} ${modelos_base["Recomendar comida"]}. ${despedida ? array_random(variacao_resposta[1]['Despedida'][resposta_personalidade[2]]) : ''}`,
        "Tarefa para restaurante":`${text_introdution} ${modelos_base["Tarefa para restaurante"]}. ${despedida ? array_random(variacao_resposta[1]['Despedida'][resposta_personalidade[2]]) : ''}`,
        "Saudação":`${array_random(variacao_resposta[1]["Saudacao"][classes_single ? 0 : 1])} ${classes_single ? array_random(variacao_resposta[1]["Interação"]) : ""}`,
      };
      return modo == 1 ? modelos : modelos_base;
  }
  let response = '';

  function verificar_conexão (index) {
    if (classes_modelo[index-1] == "Saudação")
     return false
  }
  for (let index_classe = 0; index_classe < classes_modelo.length; index_classe++) {
      let modo = resposta_personalidade[1];
      let despedida = index_classe === classes_modelo.length - 1;
      let text_status = index_classe === 0 ? "Saudacao" : verificar_conexão(index_classe) ? "Conectivo" : "Conectivo-neutro";
      let classe = classes_modelo[index_classe];
      console.log ( classe,592 )
      response += modelos_resposta(modo, text_status, despedida)[classe];
      if (despedida && classes.includes('resposta-animada'))
       response += ' !_! ';
      if (index_classe !== 0 || modo === 0) {
          response += '. ';
      }
  }
  if (classes_modelo.length == 0) 
    if (classes.includes('resposta-animada'))
     response += ' !_! ';
    else if (classes.includes('exigência')){
     let responses = ['Do que precisa?','O que quer ver?']
     response += array_random(responses)
    }
    else {
     random_response = ['Não intendi muito bem :|', 'Poderia repetir?', 'Se estiver em ambiente muito barulhento tem a opção de escrever :)']
     response += random_response[Math.floor(Math.random() * random_response.length)]
    }
  
  return response;
  }
  function array_random(array) {
  if (array.length === 0) {
      return "Sem variação";
  }
  let objeto = array[Math.floor(Math.random() * array.length)];
  return objeto;
  }
    calculos = verificar_compatibilidade_string (ditado_usuário, ditados_modelo);
    if (calculos[0])console.log (calculos[2][2],calculos[2][0])
    if (calculos[0])if(média_tamanho_palavras(calculos[2][2],calculos[2][1]) || calculos[1] > 90) {
      classes = response (calculos[2][1])
      //console.log (calculos[2][1])
      console.log (classes,"- Foram encontradas")
      return modelos_resposta ([ditados_modelo[calculos[2][0]]], classes, ditado_usuário)
    }
    else console.log ("Padrão de tamanho muito diferente")
  const lista_de_produtos = [
    "salgado","heineken","bebidas",
    "pratos","sobremesa","xbuguer",
    "cerveja","combo","doces",
    "lanche","sal","hamburguer",
  ]
  classes = response (ditado_usuário)
  function verificar_produto_in_texto (lista_de_produtos, texto) {
    texto = normalizar_texto(texto, true, false,true)
    texto = texto.toLowerCase().split(' ').join('')
    for (produto of lista_de_produtos)
      for (letra_identificador in texto)
      if (texto[letra_identificador] + texto[parseInt(letra_identificador) +1] == produto[0] + produto[1])
        if (verificar_compatibilidade_produto (produto,texto,letra_identificador)){
          if (!classes[1].includes(produto)) {
            classes[0].push('tipo_de_comida')
            classes[1].push(produto)
          }
        }
  }
    verificar_produto_in_texto (lista_de_produtos, ditado_usuário)
  classes_modelo = verificar_condição(classes[0])
  console.log (classes)
  return modelos_resposta (classes_modelo, classes, ditado_usuário)
  }
// Criar variação de palavras //
function variação_palavras(palavra) {
  let variação = "";
  function trazer_variações(index, pal) {
    let new_palavra = "";
    function estrutura_palavras_passadas(index, pal) {
      let palavra = "";
      if (index > 1) {
        for (let int = 0; int < index - 1; int++) {
          palavra += pal[int];
        }
        return palavra;
      } else {
        return "";
      }
    }
    function estrutura_palavras(letras_var, new_palavra, index, pal) {
      for (let letra of letras_var) {
        new_palavra += estrutura_palavras_passadas(index, pal);
        new_palavra += letra;
        for (let resto_palavra = index; resto_palavra < pal.length; resto_palavra++) {
          if (resto_palavra < pal.length) {
            new_palavra += pal[resto_palavra];
          }
          if (resto_palavra >= pal.length -1) {
            new_palavra += " ";
          }
        }
      }
      return new_palavra;
    }
    for (let estrutura_palavra = 0; estrutura_palavra < index; estrutura_palavra++) {
      if (estrutura_palavra == index - 1) {
        new_palavra = estrutura_palavras(letras_var, new_palavra, index, pal);
        return new_palavra;
      }
    }
  }
  for (let letra = 0; letra < palavra.length + 1; letra++) {
    variação += trazer_variações(letra + 1, palavra);
  }
  return variação.split();
}
// -- -- //
function caracteres_unicos (string) {
  const caracteres = string.split('')
  const caracteres_unicos = caracteres.filter((caracter,index) =>{
      if (caracteres.indexOf(caracter) === index)
      return caracter
  })
  return caracteres_unicos.join('')
}
// -- -- //
function verificar_compatibilidade_string (ditado_usuário, ditados_modelo) {
  ditado_usuário = normalizar_texto(ditado_usuário,true, true, true)
  let acerto_max = ["",0];
  let letras_modelo = [{},0]
  let letras_usuário = [{},0]
  for (ditado_modelo in ditados_modelo) {
    ditado_modelo_ = ditado_modelo
    ditado_modelo = normalizar_texto(ditado_modelo,true, false, true)
    letras_modelo = [{},0]
    letras_usuário = [{},0]
    for (letra of caracteres_unicos (ditado_modelo)) {
      letras_modelo[0][letra] = ditado_modelo.split(letra).length -1
      letras_modelo[1] += ditado_modelo.split(letra).length -1
    }
  for (letra of caracteres_unicos(ditado_usuário)) {
    letras_usuário[0][letra] = (ditado_usuário.split(letra).length -1)
    if ((Object.keys(letras_modelo[0])).includes(letra) && (ditado_usuário.split(letra).length -1) <= letras_modelo[0][letra])
     letras_usuário[1] += (ditado_usuário.split(letra).length -1)
    else if ((Object.keys(letras_modelo[0])).includes(letra) && (ditado_usuário.split(letra).length -1) > letras_modelo[0][letra]) {
      letras_usuário[1] += letras_modelo[0][letra]+(letras_modelo[0][letra] - ((ditado_usuário.split(letra).length -1)))
  }
  else letras_usuário[1] -= (ditado_usuário.split(letra).length -1)
  }
  acerto = letras_usuário[1]/letras_modelo[1] * 100
  if (acerto > acerto_max[1]) acerto_max = [[ditado_modelo_,ditado_modelo,ditado_usuário],acerto]
  }
  if (acerto_max[1] > 73) {
    return [true,acerto_max[1],[acerto_max[0][0],acerto_max[0][1],acerto_max[0][2]]]
  }
  return [false,acerto_max]
}
// -- -- //
function verificar_compatibilidade_produto (ditado_usuário, ditados_modelo, index) {
  let ditado_modelo = ''
  for (let tamanho_produto = index; tamanho_produto < index + ditado_usuário.length && tamanho_produto < ditados_modelo.length; tamanho_produto++) {
    ditado_modelo += ditados_modelo[tamanho_produto]
  } 
  letras_modelo = [{},0]
  letras_usuário = [{},0]
  for (letra of caracteres_unicos (ditado_modelo)) {
    letras_modelo[0][letra] = ditado_modelo.split(letra).length -1
    letras_modelo[1] += ditado_modelo.split(letra).length -1
  }
  for (letra of caracteres_unicos(ditado_usuário)) {
    letras_usuário[0][letra] = (ditado_usuário.split(letra).length -1)
    if ((Object.keys(letras_modelo[0])).includes(letra) && (ditado_usuário.split(letra).length -1) <= letras_modelo[0][letra])
     letras_usuário[1] += (ditado_usuário.split(letra).length -1)
    else if ((Object.keys(letras_modelo[0])).includes(letra) && (ditado_usuário.split(letra).length -1) > letras_modelo[0][letra]) {
     letras_usuário[1] += letras_modelo[0][letra]+(letras_modelo[0][letra] - ((ditado_usuário.split(letra).length -1)))
    }
  else letras_usuário[1] -= (ditado_usuário.split(letra).length -1)
  }
  acerto = letras_usuário[1]/letras_modelo[1] * 100
  
  if (acerto > 70){
   console.log (acerto)
   return true
  }
}
// -- -- //
function média_tamanho_palavras(texto,texto_2){
  texto_size = texto.length
  texto_size_2 = texto_2.length
  texto = texto.split(' ')
  texto_2 = texto_2.split(' ')
  texto_2 = texto_2.filter(palavra =>{
    if (palavra !== '')
     return palavra
  })
  calculo = (texto_size/texto.length)/(texto_size_2/texto_2.length)
  console.log (calculo)
  return calculo > 0.85 && calculo < 1.15 ? true : false
  }
// Iniciar reconhecimento de palavras //
function response(palavras) {
  let dados_index = 0;
  let chaves = [];
  palavras = normalizar_texto(palavras,false,true)
  function comparar_array(palavras, pala_key) {
    for (let palavra of palavras) {
      if (palavra in dados_normalizados()) {
        chaves.push([palavra,dados_normalizados()[palavra]]);
        return true;
      }
    }
    return false;
  }
  function verificar_float(string) {
    return !isNaN(parseFloat(string));
  }
  for (let palavra of palavras) {

    if (palavra.length == 0) continue;
    if (palavra == "eu") chaves.push([palavra,14]);
    if (palavra == "ok") chaves.push([palavra,40]);
    if ("?".includes(palavra)) {
      chaves.push([palavra,8]);
      continue;
    }
    if (palavra.length < 3 && isNaN(palavra)) continue;
    if (palavra == "uma") continue;
    if (palavra.length == 1 && !"?".includes(palavra) && isNaN(palavra)) continue;
    //for (palavra_dado in dados_normalizados())
    //  console.log (palavra_dado)
    let palavras_var;
    if (palavra in dados_normalizados()) {
      palavras_var = palavra.split();
      
    } else if (palavra[palavra.length - 1] == "s") {
      let nova_palavra = palavra.slice(0, -1);
      if (nova_palavra in dados_normalizados()) {
        palavras_var = nova_palavra.split();
      } else {
        continue;
      }
    } else if ((palavra + "s") in dados_normalizados()) {
      palavras_var = (palavra + "s").split();
    } else {
      palavras_var = variação_palavras(palavra);
    }
    let pala_key = dados;
    if (!isNaN(palavra)) {
      chaves.push([palavra,6]);
    } else {
      comparar_array(palavras_var, pala_key);
    }
  }
  return traduzir_chaves(chaves);
}
class IA_functions {
  
  constructor (message, peso) {
    this.messageNormalized = message
    this.message = message
    this.peso = peso
  }
  normalizeWords () { const texto = normalizar_texto (this.messageNormalized, true);}
  async response () { return response (this.message) }
  async texto_aproximado () { return verificar_ditados_próximos(this.message) }
}
exports.handler = async function (event,context) {

  const message = event.queryStringParameters.message
  const status = event.queryStringParameters.status
  const Doming_Personity = new IA_functions (message,1)
  const texto_aproximado = await Doming_Personity.texto_aproximado()
  if (status == "classes") {
   return {
    statusCode:200,
    body:JSON.stringify({texto_aproximado: texto_aproximado})
   }
  }
  if (status == "normalized") {
   const normalized = Doming_Personity.normalizeWords()
   return {
     statusCode:200,
     body:JSON.stringify({response: normalized})
   }
  }
}