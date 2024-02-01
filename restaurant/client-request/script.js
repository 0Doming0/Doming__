 const heightResize= () => {
   const height_mobile= document.documentElement;
   
   height_mobile.style.setProperty('--doc-height',window.innerHeight-50/100*window.innerHeight+'px');
 }

 window.addEventListener('resize',heightResize);
 heightResize();

 const abertura_inicial= document.getElementById('Begin_animation');

 setTimeout(()=>{
    abertura_inicial.style.display='none';
},0)
var abertura_var=0;
 setInterval(()=>{
    if(abertura_var<600)abertura_var++;
 },8)

 document.body.style.top='0px';
 var touch=0;var touchmove;var touchend=0;
 document.addEventListener('touchstart', function(e){
    touchbegin=e.touches[0].clientY;
    
 });
 document.addEventListener('touchmove',function(e){
   touchmove= e.changedTouches[0].clientY;
   if(touch+touchmove-touchbegin<=0)
    document.body.style.top=touch+touchmove-touchbegin+'px';
   else {touch=0;document.body.style.top='0px';}
 });
 document.addEventListener('touchend',function(e){
  if(touch+touchmove-touchbegin<=0)
  touch+=touchmove-touchbegin;
 })
 

function loading_abertura(){
  bar=document.getElementById('loading_Bar');
  if(bar)
   bar.style.width=abertura_var/600*280+'px';

  

  requestAnimationFrame(loading_abertura);
}
loading_abertura();

function restartGif(){
  gif=abertura_inicial.querySelector('img');
  if(gif){
    gif.style='display:none;';
    gif.style='display:block;';
    
    setTimeout(()=>{
      gif.src=gif.src;
    },0);
  }
}
restartGif();

// Atualizar cardápio
 function update_cardápio(){
   fetch('/updateDataRestaurant?restaurant='+restaurant)
   .then(resposta=>resposta.json())
   .then(json=>{json=json['cardapio'];
 
  })
   .catch(error=>console.log('Ocorreu um erro '+error))
 }
setInterval(update_cardápio,10000);
update_cardápio();

var descricao_order_confirm= document.getElementById('descricao_order_confirmation');

function Gerenciar_dados_solicitação(garçom,pedidos,valor,descricao, enviar){
  dados={["mesa "+code_mesa]:{"solicitacao":['','','',['','']]}}
  dados[Object.keys(dados)[0]]["solicitacao"]= [garçom,pedidos,valor,descricao];
  if(enviar)
   return Enviar_solicitações(dados);
}
 // Enviar solicitação de pedido ao restaurante
 function Enviar_solicitações(dados){
 fetch('/'+restaurant+'/solicitar-pedido',{
    method:"POST",
    headers:{
        "Content-Type":"application/json"
    },
    body: JSON.stringify(dados)
 })
 .then(resposta => resposta.json())
 .then(texto => console.log(texto))
 .catch(error => console.log('O garçom não foi chamado. Tente novamente mais tarde'));
}
 function Ocupar_mesa(){
  
  fetch('/'+restaurant+'/ocupar-mesa/'+"mesa "+code_mesa)
  .then(resposta => {if(!resposta.ok)throw new Error(`Erro na requisição: ${resposta.status}`);resposta.text()})
  .then(texto => console.log(texto))
  .catch(error => console.error(error))
  

 }
Ocupar_mesa();

function adicionar_remover_pedido(main,status){
  quantidade= parseInt(main.querySelector('p').textContent);
  valor= return_valor(main.parentNode.querySelector('li').querySelectorAll('span')[1].textContent);
  if (status){
    aplicar_valor(valor);
    quantidade++;
    main.querySelector('p').textContent=''+quantidade;
  }
  else{
    aplicar_valor(-valor);
    quantidade--;
    main.querySelector('p').textContent=''+quantidade;
  }
  if (quantidade==0){
    pedido= main.parentNode;
    pedido.parentNode.removeChild(pedido);
  } 
}

pedidos= document.getElementsByClassName('cardápio')[1].querySelector('div[name="cardápio"]').querySelectorAll('li');
purchase_pedidos= document.getElementsByClassName('cardápio')[1].querySelector('div').querySelectorAll('div[name="comprar"]');
document.activeElement.addEventListener("click", (element)=>{
  pedidos.forEach(pedido=>{
    if (document.activeElement == pedido)
     shop_item(pedido);
  })
  purchase_pedidos.forEach(button=>{
    if (document.activeElement == button){
    Item_shop= button.parentNode.querySelector('li');
    pedir_shop_item(true);
    }
  })
  if (document.activeElement == document.getElementById('Confirmar_add'))
   document.getElementById('Confirmar_add').style.display= 'none';
  //if (getComputedStyle(document.documentElement).getPropertyValue("--show-pedidos")== "block")
  // document.documentElement.style.setProperty("--show-pedidos","none");
})
function return_valor(string){
  valor= '';
  for(let char= 0;char<string.length;char++) 
   if (!isNaN(string[char])||string[char]=='.')
    valor+= string[char];
  return parseFloat(valor)
}
var valor_atual=0;
function aplicar_valor(valor){
  valor_atual+=valor;
  document.getElementById('valor_confirmar').textContent='R$ '+valor_atual.toFixed(2);
}

var pedidos_carrinho=[];
var Item_shop;
function shop_item(Item){
    document.getElementById('Confirmar_add').style.display='flex';
    document.getElementById('add_block').querySelector('p').textContent='Oi. Quer mesmo adicionar '+Item.querySelectorAll('span')[0].textContent+' aos pedidos?';
    document.getElementById('add_block').querySelector("p[name='descricao']").textContent= 
    "Os Kurtos kalacs , também chamados de Trdlo, trudel ou chimney cakes , podem se apresentar como doces ou salgados , nos formatos retos, mini ou cone tipo cascão. No mundo todo temos kurtos , com cremes , Nutellaª , sorvetes , queijos , saladas e diversos tipos de carnes. Enviamos aos clientes diversas receitas  e um mini curso de como preparar a massa";
    Item_shop=Item;
}
var animaçõesText={}
document.activeElement.addEventListener("click",function(element){
  if (document.activeElement.classList.contains("ver-mais_descricao")){
   descricao= document.activeElement.parentNode.parentNode.getElementsByClassName("pedido_descricao")[0].querySelector("div[name='descrição']");
   texto= "Os Kurtos kalacs , também chamados de Trdlo, trudel ou chimney cakes , podem se apresentar como doces ou salgados , nosformatos retos, mini ou cone tipo cascão. No mundo todo temos kurtos , com cremes , Nutellaª , sorvetes , queijos , saladas e diversos tipos de carnes. Enviamos aos clientes diversas receitas  e um mini curso de como preparar a massa.";
   if (descricao.style.display == 'none' || descricao.style.display == ''){
   descricao.style.display= 'block';
   
   heightElement= descricao.querySelector("p").scrollHeight+descricao.querySelector("p").textContent.length/15;
   descricao.style.setProperty("--height-descricao",heightElement+70+'px');
   let animacaoTexto= new animar_texto(texto,0.014,descricao.querySelector('p'));
   animaçõesText[descricao.querySelector('p')]= animacaoTexto;
   }
   else {
    descricao.querySelector('p').textContent=texto;
    animaçõesText[descricao.querySelector('p')].desativar_animação();
    descricao.style.display= "none";
  }
  }
  if (element.target.classList.contains("active-button-meus_pedidos"))
  if (getComputedStyle(document.documentElement).getPropertyValue("--show-pedidos")== "none"){
   document.documentElement.style.setProperty("--show-pedidos","flex");
   document.getElementsByClassName("meus_pedidos")[0].style.setProperty("--active_rotate-pedidos","90deg");
   console.log('Passou mouse');
   ajustar_fonts();
  }
  else desativar_meus_pedidos();
})
const desativar_meus_pedidos = ()=>{
  document.documentElement.style.setProperty("--show-pedidos","none");
  document.getElementsByClassName("meus_pedidos")[0].style.setProperty("--active_rotate-pedidos","-90deg");
  console.log('Tirou mouse');
}
//document.getElementsByClassName("cardápio meus_pedidos")[0].onmouseleave = ()=>desativar_meus_pedidos();

const meuMapa= new Map();
const calcular_bezier= (interval,bezier)=>{return interval*1000/bezier}
function animar_texto(texto, interval, element){
  let index=0;let texto_animado='';
  let access=false;
  element.textContent='';
  meuMapa.set(this,1);
  let temp_animation= (bezier)=> setTimeout(function(){
   if (texto_animado.length <= texto.length-1 && !access){
    texto_animado+= texto[index];
    index++; 
    var bezier= index*5/(texto.length-1)+1;
    temp_animation(bezier)
    element.textContent= texto_animado;}
  }.bind(this),calcular_bezier(interval,bezier))
  setTimeout(temp_animation,200);
  function desativar_animação(){access=true;}
  return {
    desativar_animação:desativar_animação
  }
}
const meus_produtos_informacao= Array.from(document.getElementsByClassName("meus_produtos-informacao"));
const atualizar_informacao_produtos= ()=>meus_produtos_informacao.forEach(function(informacao){
  informacao.textContent= document.getElementsByClassName("meus_pedidos")[0].querySelector('div').children.length + ' produtos';
})
atualizar_informacao_produtos();


function ajustar_fonts(){
  var ajustar_fonts= Array.from(document.getElementsByClassName("ajustar_font_nome"));
  ajustar_fonts.forEach((font_element)=>{
    let font_length= font_element.textContent.length;
    let parent= font_element.parentNode;
    let width_parent= parent.offsetWidth;
    font_element.style.fontSize= 10/(Math.pow(font_length,1.35)/font_length*4.5)*18+'px';
  })
}
window.addEventListener('load',ajustar_fonts);
window.addEventListener('resize',ajustar_fonts);

function pedir_shop_item(pediu){
  if(pediu){
    valor=return_valor(Item_shop.querySelectorAll('span')[1].textContent);
    aplicar_valor(valor);
    adicionar_pedido_carrinho(Item_shop);
    atualizar_informacao_produtos();
    pedidos_carrinho.push(Item_shop.querySelectorAll('span')[0].textContent);
  }
  else{
    document.getElementById('Confirmar_add').style.display='none';
  }
}
function adicionar_pedido_carrinho(item){icon=false;pedido_atualizado=false;
  Array.from(document.getElementsByClassName('meus_pedidos')[0].querySelector('div').children).forEach((pedido)=>{
    if (pedido.getElementsByClassName("pedido_descricao")[0].querySelector('li').querySelector('div[name="informação"]').querySelectorAll('span')[0].textContent == item.querySelectorAll('span')[0].textContent){
     quantidade= parseInt(pedido.querySelector('div[name="pedido_quantidade"]').querySelector('p').textContent)+1
     pedido.querySelector('div[name="pedido_quantidade"]').querySelector('p').textContent= ''+quantidade;
     pedido_atualizado=true;
    }
  })
  if (pedido_atualizado)return;

  order_element= document.createElement('div');
  order_element.classList.add("order_main");
  document.getElementsByClassName('meus_pedidos')[0].querySelector('div').appendChild(order_element);
  div_pedido_descricao= document.createElement('div');
  div_pedido_descricao.classList.add("pedido_descricao");
  order_element.appendChild(div_pedido_descricao);
  order_list= document.createElement('li');
  order_list.setAttribute("tabindex","0");
  pedido_attribute= document.createElement('li');
  attribute= document.createElement('p');
  attribute.textContent= '50 gramas | 2 pessoas';
  pedido_attribute.appendChild(attribute);
  div_pedido_descricao.appendChild(order_list);
  div_pedido_descricao.appendChild(pedido_attribute);
  descricao= document.createElement('div');
  descricao.setAttribute("name","descrição");
  descricao.setAttribute("tabindex","0");
  div_pedido_descricao.appendChild(descricao);
  descricao_title=document.createElement('h3');
  descricao_title.textContent= item.querySelectorAll('span')[0].textContent;
  descricao_text= document.createElement('p');
  //descricao_text.textContent= "Desfrute da perfeição crocante e do irresistível sabor doce em cada mordida! Nossa Pipoca Doce é cuidadosamente preparada com milho estourado, envolto em uma deliciosa camada de caramelo que derrete na boca. Uma explosão de prazer para todos os amantes de doces, perfeita para transformar seus momentos em experiências memoráveis. Adoce seu dia com a melhor pipoca doce da cidade!";
  descricao_text.textContent= "Os Kurtos kalacs , também chamados de Trdlo, trudel ou chimney cakes , podem se apresentar como doces ou salgados , nosformatos retos, mini ou cone tipo cascão. No mundo todo temos kurtos , com cremes , Nutellaª , sorvetes , queijos , saladas e diversos tipos de carnes. Enviamos aos clientes diversas receitas  e um mini curso de como preparar a massa.";
  //descricao_text.textContent= "Desfrute da perfeição crocante e do irresistível sabor doce em cada mordida! Nossa Pipoca Doce é cuidadosamente preparada com milho estourado, envolto em uma deliciosa camada de caramelo que derrete na boca. Uma explosão de prazer para todos os amantes de doces, perfeita para transformar seus momentos em experiências memoráveis. Adoce seu dia com a melhor pipoca doce da cidade!"+"Desfrute da perfeição crocante e do irresistível sabor doce em cada mordida! Nossa Pipoca Doce é cuidadosamente preparada com milho estourado, envolto em uma deliciosa camada de caramelo que derrete na boca. Uma explosão de prazer para todos os amantes de doces, perfeita para transformar seus momentos em experiências memoráveis. Adoce seu dia com a melhor pipoca doce da cidade!";
  descricao.appendChild(descricao_title);
  descricao.appendChild(descricao_text);
  imagem= document.createElement('div');
  imagem.setAttribute("name","imagem");
  order_list.appendChild(imagem);
  informacao= document.createElement('div');
  informacao.setAttribute("name","informação");
  order_list.appendChild(informacao);
  nome= document.createElement('span');
  nome.textContent= item.querySelectorAll('span')[0].textContent;
  nome.classList.add("ajustar_font_nome");
  informacao.appendChild(nome);
  valor= document.createElement('span');
  valor.textContent= item.querySelectorAll('span')[1].textContent;
  informacao.appendChild(valor);
  main_pedido_quantidade= document.createElement('div')
  main_pedido_quantidade.setAttribute("name","pedido_quantidade");
  order_element.appendChild(main_pedido_quantidade);
  quantidade= document.createElement('p');
  quantidade.textContent= "1";
  quantidade.setAttribute("tabindex","0");
  quantidade.classList.add("ver-mais_descricao");
  main_pedido_quantidade.appendChild(quantidade);
  retirar= document.createElement('div');
  retirar.textContent= !icon?'remover':'-';
  retirar.setAttribute("name","retirar");
  retirar.setAttribute("onclick","adicionar_remover_pedido(this.parentNode,false)");
  main_pedido_quantidade.appendChild(retirar);
  adicionar= document.createElement('div');
  adicionar.textContent= !icon?'adicionar':'+';
  adicionar.setAttribute("name","adicionar");
  adicionar.setAttribute("onclick","adicionar_remover_pedido(this.parentNode,true)");
  main_pedido_quantidade.appendChild(adicionar);
  line_separator= document.createElement("div");
  line_separator.classList.add("separator_line");
  order_element.appendChild(line_separator);
  //console.log(order_element);
  ajustar_fonts();
}

function show_pedidos(pedidos){
   pedidos.querySelector('ul').style.display='flex';
}
function Confirmar_compra_pedidos(status){
  div=document.getElementById('Confirmar_todos_pedidos_payment_block');
  if(status=='confirmar'){
  document.getElementById("valor_order_confirm").textContent= 'R$ '+valor_atual.toFixed(2);
  div.style.display='flex';
  document.getElementsByClassName("cardápio meus_pedidos")[0].querySelector('div').style.display='none';

  }
  if(status=='pagar'){
   Gerenciar_dados_solicitação('request_garçom',pedidos_carrinho,valor_atual.toFixed(2),[document.getElementById("name_client_order").value,document.getElementById("descricao_order").value],true);
   form=document.getElementById('formulário');form.action='/'+restaurant+'/client-payment/'+code_mesa;
   form.querySelector('input').value=valor_atual.toFixed(2).toString().replace('.','');
   console.log(valor_atual.toFixed(2).toString().replace('.',''));
   form.submit();

  }
}
document.getElementById("descricao_order").parentNode.addEventListener('click',()=>{
  document.getElementById("descricao_order").focus()
})
//document.getElementById('Confirmar_todos_pedidos_payment_block').style.display='flex';