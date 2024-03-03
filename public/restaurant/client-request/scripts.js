 const heightResize= () => {
   const height_mobile= document.documentElement;
   
   height_mobile.style.setProperty('--doc-height',window.innerHeight-50/100*window.innerHeight+'px');
 }
 window.addEventListener('resize',heightResize);
 heightResize();
 const abertura_inicial= document.getElementById('Begin_animation');


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


// Atualizar cardápio
 function update_cardápio(){
   fetch('/updateDataRestaurant?restaurant='+restaurant)
   .then(resposta=>resposta.json())
   .then(json=>{json=json['cardapio'];
 
  })
   .catch(error=>console.log('Ocorreu um erro '+error))
 }



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
Gerenciar_dados_solicitação("requestGarçom",["Brigadeiro","coco"],10.50,true);
 function Ocupar_mesa(){
  
  fetch('/'+restaurant+'/ocupar-mesa/'+"mesa "+code_mesa)
  .then(resposta => {if(!resposta.ok)throw new Error(`Erro na requisição: ${resposta.status}`);resposta.text()})
  .then(texto => console.log(texto))
  .catch(error => console.error(error))
 }

const Lista_carrinho = [
]
Lista_cardápio={
  "Sopa de ervilha":10,
  "Caldo verde":12.5,
}

function adicionar_remover_pedido(main,status){
 nome= main.parentNode.querySelector("span").textContent;
 valor= return_valor(main.name);
 aplicar_valor(valor);
 Lista_carrinho.push(nome);
 console.log(Lista_carrinho.filter((produto)=>{
   return Lista_cardápio[produto] === 10;
 }).length)
}
let frame_focus = false;
div_talk= document.getElementById("containers-info").querySelector('div[name="Doming-talk"]');
div_talk_text= div_talk.querySelector("span").textContent;
div_talk.addEventListener("focus",()=>{
  pontos_animação.iniciar();
  frame_focus = true;
})
div_talk.addEventListener("click",()=>{
  if (frame_focus) {frame_focus=false; return;} 
  if (!animação_ativado)
   {pontos_animação.iniciar();}
  else if(!frame_focus) pontos_animação.desativar();
})
div_talk.addEventListener("blur",()=>{
  pontos_animação.desativar();
})
let animação_ativado;
function pontos_animação(){
  let Interval_pontos;
  function iniciar () {let iteration=0;animação_ativado=true;
    Interval_pontos= setInterval(()=>{
    if (iteration > 1){
      div_talk.querySelector("span").textContent= div_talk_text
      return iteration=0;
    }
    iteration++;
    div_talk.querySelector("span").textContent+= ".";
  },800)
   document.getElementsByClassName("Doming-chat")[0].classList.add("opening_chat");
  }
 function desativar () {
  animação_ativado=false;
  clearInterval(Interval_pontos);
  div_talk.querySelector("span").textContent= div_talk_text;
  document.getElementsByClassName("Doming-chat")[0].classList.remove("opening_chat");
  div_talk.blur()
 }
  return{
    iniciar:iniciar,
    desativar:desativar,
    status:animação_ativado,
  }
}
var pontos_animação= new pontos_animação();
//pedidos= document.getElementsByClassName('cardápio')[1].querySelector('div[name="cardápio"]').querySelectorAll('li');
//purchase_pedidos= document.getElementsByClassName('cardápio')[1].querySelector('div').querySelectorAll('div[name="comprar"]');
document.activeElement.addEventListener("click", (element)=>{
  // pedidos.forEach(pedido=>{
  //   if (document.activeElement == pedido)
  //    shop_item(pedido);
  // })
  // purchase_pedidos.forEach(button=>{
  //   if (document.activeElement == button){
  //   Item_shop= button.parentNode.querySelector('li');
  //   pedir_shop_item(true);
  //   }
  // })
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
// Gerar cardápio //


// Meus pedidos //
document.getElementById("containers-info").querySelector("div[name='purchase-items']").addEventListener("focus",()=>{
  gerar_meu_pedido()
})
const pag= document.getElementById("meu-pedido_pag");
pag.querySelector("h3").addEventListener("click",()=>{
  fechar_pedidos()
});
function gerar_meu_pedido(){
  pag.style.display="block";
  pag.querySelector("h4[name='confirmar-compra']").addEventListener("focus",()=>{

  })
}
function fechar_pedidos(){
  pag.style.display="none";
}

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
    console.log("Ativando");
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
  
 

  
  ajustar_fonts();
}

function show_pedidos(pedidos){
   pedidos.querySelector('ul').style.display='flex';
}
function Confirmar_compra_pedidos(status){
  div=document.getElementById('Confirmar_todos_pedidos_payment_block');
  if(status=='confirmar'){
  document.getElementById("valor_order_confirm").textContent= 'R$ '+valor_atual.toFixed(2);
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
document.addEventListener("DOMContentLoaded",()=>{
  var list_hash=[''];
  var index_hash=0;
  const action_hash = (hash)=> {
    element= document.getElementById(hash);
    if (list_hash.includes(hash))
     list_hash_settings(hash);
    else
     list_hash.push(hash);
    if (element == null) {return;}
    if (hash == "Confirmar_todos_pedidos_payment_block"){
     element.style.display= "flex";
    }
  }
  window.addEventListener("hashchange",function(){
    const hash_function= window.location.hash.substring(1);
    action_hash(hash_function);
   })
   window.location.hash='';
  function list_hash_settings(hash){
    let index_max= list_hash.length;
    for(let index=list_hash.indexOf(hash)+1;index<index_max;index++){
      element= document.getElementById(list_hash[index]);

      if(element != null) element.style.display= "none";
      list_hash.splice(index);
    }
  }
}) 

const roll_page= document.getElementById("roll-page");
if (roll_page != null){
const pages_roll= roll_page.querySelectorAll("div[name='page']");
pages_roll[1].querySelector("section").style.display = "none";
}
let valor_roll=0;

function update(){
  if (valor_roll == pages_roll.length-1)
   valor_roll--;
  else
   valor_roll++;
  if (valor_roll == 1)
   pages_roll[valor_roll].querySelector("section").style.display= "flex";
  else pages_roll[valor_roll].querySelector("section").style.display= "block";
  roll_page.style.left= -valor_roll*100+"%";
      pages_roll.forEach((page)=>{
      if (page != pages_roll[valor_roll]){
      page.querySelector("section").style.display= "none";}
      else if (Array.from(pages_roll).indexOf(page) == 1)
       page.querySelector("section").style.display= "flex";
      else page.querySelector("section").style.display= "block";
    });
}
const cardápio_page= document.getElementById("restaurante-cardápio");
let execução;
function update_car(){
  if (execução) return;
  execução= true;
  var pages_cardápio= cardápio_page.querySelectorAll("ul");
  pages_cardápio[1].querySelector("div[name='sub-page']").style.display= "flex"
  pages_cardápio[1].classList.add("roll-lerp-car")
   setTimeout(()=>{
     pages_cardápio[1].classList.remove("roll-lerp-car")
     pages_cardápio[1].style.left = -0+"%"
     pages_cardápio.forEach((page)=>{
      if (page != pages_cardápio[1]){
       page.querySelector("div[name='sub-page']").style.display= "none"
       page.parentNode.appendChild(page)
      }
      else page.querySelector("div[name='sub-page']").style.display= "flex"
     execução= false;
    })
   },680)
  
}

var ongoing = false;
        var recognition = null;
 
        function verificaStatus(){
            if (ongoing == true){
                recognition.start();
            }
        }
 
        function init(){
            window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
            recognition = new SpeechRecognition();
            recognition.interimResults = true;
            recognition.lang = 'pt-BR';
 
            var p = document.createElement('span');
            const words = document.querySelector('.words');
            words.appendChild(p);
 
            recognition.addEventListener('result', e => {
                const transcript = Array.from(e.results)
                .map(result => result[0])
                .map(result => result.transcript)
                .join('');
            
                p.textContent = transcript + ", ";
                if (e.results[0].isFinal) {
                    p = document.createElement('span');
                    words.appendChild(p);       
                }
                });
            recognition.addEventListener('end', verificaStatus);
            recognition.start();
        }
 
        function doStartStopCheck(){
            if(ongoing == true){ // se tiver rodando, vai interromper
                ongoing = false;
                recognition.stop();     
                document.getElementById('btn_speech').innerHTML = "Transcrever Áudio";
            }
            else if (recognition) { // se tiver instância SpeechRecognition, apenas reinicia
                ongoing = true;
                recognition.start();        
                document.getElementById('btn_speech').innerHTML = "Interromper";
            }
            else { // se ainda não criou instância, chama a função para inicialização
                console.log("init");
                ongoing = true;
                init();    
                document.getElementById('btn_speech').innerHTML = "Interromper";
            }
        }
 
        function rolaScroll(){
            const w = document.querySelector('.words');
            w.scrollTop = w.scrollHeight;
        }
 
        setInterval(rolaScroll, 1000);