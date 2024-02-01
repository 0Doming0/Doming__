
function click_Seletor(botao){
    form= botao.parentNode
    form.submit()
}

function mesa_information_inicial(){
    if(document.getElementById('tableInfo_block')==null)return;
    id_mesa=document.getElementById('tableInfo_block').querySelector('span')
    if(id_mesa==null)return;
    id_mesa.style.display='none'
    info_mesa=document.getElementById('mesa_information')
    info_mesa.style='position:relative;top:50%;padding:10px;'
    document.getElementById('tableInfo_block').querySelector('div[class="separator_line"]').style.display='none';
}
mesa_information_inicial();

cardápio={
    "cardapio":
    {"Doces":[["10 barras de chocolate",30], ["Coco",2]],
     "Sucos":[["20 garrafas de Laranja",110], ["Suco de uva",6.5]],
     "Refrigerantes":[["20 garrafas de Fanta Laranja",130], ["Coca Cola",7.5], ["2 latas de Fanta Uva",7.5]]
    }
}

//Enviar cardápio para servidor
fetch('/'+restaurant+'/changeMenu',{
    method:"POST",
    headers:{"Content-Type":"application/json"},
    body: JSON.stringify(cardápio)
})
.then(resposta => resposta.text())
.then(texto =>texto)
.catch(error => console.log('Deu '+error))

function gerar_code_mesa(length){
const caracteres= 'qwertyuiopasdfghjklzxcvbnm0123456789';
var codeRandom_mesa= '';

for(var i =0;i<length;i++){
    var indice= Math.floor(Math.random()* caracteres.length);
    codeRandom_mesa+= caracteres.charAt(indice);
 }
return codeRandom_mesa;}

var qrcode_image= document.getElementById('image_qrcode_mesa');
var name_client= document.getElementById('name_client');
var descricao_client= document.getElementById('descricao_client');
var mesa_info=document.getElementById('mesa_information');
var mesa_atual;var code_mesa_atual;
precoInfo= document.getElementById('precoInfo');

function mesaLink(mesa,code_mesa,mesaElement){if (document.getElementById('tableInfo_block') == null) return;
    elementInfo=document.getElementById('tableInfo_block');
    elementInfo_text=elementInfo.querySelector('span');
    elementInfo_requestGarçom=elementInfo.querySelector('#requestGarçom');
    
    lista=document.getElementById('tableMenu_block').children
    for(let obj= 0;obj<lista.length;obj++)
     if(lista[obj].tagName == 'LI'&&lista[obj].classList != 'list_ghost'){
      if(lista[obj] != mesaElement){
       if (lista[obj].querySelector('p').textContent== 'Ocupado')
        lista[obj].style.borderColor= 'rgb(58, 98, 227)';
       else lista[obj].style.borderColor= 'blue';
       if (lista[obj].querySelector('p').textContent== 'Vazio')
        lista[obj].style.borderColor= 'black';
       lista[obj].style.borderWidth= '2px';
       lista[obj].style.backgroundColor= 'rgb(240, 240, 240)';
      }
      }
    mesa_atual=mesa;code_mesa_atual=code_mesa;
    qrcode_image.src= 'data:image/png;base64,'+dados_restaurant["Mesas"][code_mesa]["settings"][1]
    descricao_client.textContent= dados_restaurant["Mesas"][code_mesa]["solicitacao"][3][1];
    name_client.textContent= dados_restaurant["Mesas"][code_mesa]["solicitacao"][3][0];
    precoInfo.textContent= 'R$ '+dados_restaurant["Mesas"][code_mesa]["solicitacao"][2];

    if(code_mesa in dados_restaurant["Mesas"]){
        if(mesaElement){
            mesaElement.style.borderColor= 'rgb(58, 200, 58)';
            mesaElement.style.borderWidth= '3px';
            mesaElement.style.backgroundColor= 'white'
         if(mesaElement.classList== 'animation_request_order'){
            mesaElement.classList.remove('animation_request_order');
         }
        }
    if(dados_restaurant["Mesas"][code_mesa]["solicitacao"][0]=='request_garçom'){
     if(dados_restaurant["Mesas"][code_mesa]["solicitacao"][1]=='')
        elementInfo_requestGarçom.style.display= 'block';
        mesa_info.style.display= 'none';
        descricao_client.style.display= 'block';
        name_client.style.display= 'block';
        qrcode_image.style.display= 'none';
    }
    else {
        elementInfo_requestGarçom.style.display='none';
        mesa_info.style.display= 'block';
        name_client.style.display= 'none';
    }
    if (dados_restaurant["Mesas"][code_mesa]["solicitacao"][1]== ''){
        document.getElementById('button_entregar_pedido').style.display='none';
        precoInfo.style.display='none';
      if (dados_restaurant["Mesas"][code_mesa]["solicitacao"][0]==''){
        mesa_info.textContent= dados_restaurant["Mesas"][code_mesa]["settings"][2] ? dados[mesa]+' está escolhendo' : dados[mesa]+' está vazia';
        qrcode_image.style.display= 'block';
        descricao_client.style.display= 'none';}
      }
    else{
    document.getElementById('button_entregar_pedido').style.display='inline';
    mesa_info.textContent=dados_restaurant["Mesas"][code_mesa]["solicitacao"][1];
    precoInfo.style.display='block';
    }
    }
    else{
        elementInfo_requestGarçom.style.display='none';
    }
    elementInfo_text.textContent=mesa;
}

function Update_página(dados_restaurant){
    elementList_mesa=document.getElementById('tableMenu_block');

     Array.prototype.filter.call(elementList_mesa.querySelectorAll('li'),function(elementMesa){
        if(elementMesa.getAttribute('value') == null)return;
        code_mesa=elementMesa.getAttribute('value');mesa=elementMesa.getAttribute('name');
        if(code_mesa in dados_restaurant["Mesas"])
        if(dados_restaurant["Mesas"][code_mesa]["solicitacao"][0]=='request_garçom'){
          elementMesa.querySelector('p').textContent='Pedido solicitado';
          if(code_mesa != code_mesa_atual){
          elementMesa.classList.add('animation_request_order');
          Array.prototype.filter.call(elementMesa.children,function (child){
            child.classList.add('animation_request_order');
          })
         }
        }else{
          elementMesa.classList.remove('animation_request_order');
          Array.prototype.filter.call(elementMesa.children,function (child){
            child.classList.remove('animation_request_order');
          })
            elementMesa.querySelector('p').textContent= dados_restaurant["Mesas"][code_mesa]["settings"][2] ? 'Ocupado' : 'Vazio';
            if (code_mesa_atual!=code_mesa)
             elementMesa.style.borderColor= dados_restaurant["Mesas"][code_mesa]["settings"][2] ? 'rgb(58, 98, 227)' : 'black';
        }
     })
     if (document.getElementById('tableInfo_block')==null)return;
    elementInfo=document.getElementById('tableInfo_block');
    elementInfo_requestGarçom=elementInfo.querySelector('#requestGarçom');
    if(code_mesa_atual){
      descricao_client.textContent= dados_restaurant["Mesas"][code_mesa_atual]["solicitacao"][3][1];
      mesa_info.textContent= dados_restaurant["Mesas"][code_mesa_atual]["settings"][2] ? dados[mesa_atual]+' está escolhendo' : dados[mesa_atual]+' está vazia';
      precoInfo.textContent= 'R$ '+dados_restaurant['Mesas'][code_mesa_atual]["solicitacao"][2];

      if(dados_restaurant['Mesas'][code_mesa_atual]["solicitacao"][0]=='request_garçom'){
       if(dados_restaurant['Mesas'][code_mesa_atual]["solicitacao"][1]=='')
        elementInfo_requestGarçom.style.display='block';
        descricao_client.style.display= 'block'
      }else{
        descricao_client.style.display= 'none'
      }
      if(dados_restaurant['Mesas'][code_mesa_atual]["solicitacao"][1]==''){
        document.getElementById('button_entregar_pedido').style.display='none';
        precoInfo.style.display= 'none';
      }
      else{
        document.getElementById('button_entregar_pedido').style.display='inline';
        precoInfo.style.display= 'block';
      }
    }
}
var dados_restaurant;update_first=false;
function Update_dados(){
 fetch('/updateDataRestaurant?restaurant='+restaurant)
 .then(resposta => resposta.json())
 .then(json=>{if("error" in json)return; dados_restaurant=json;if(!update_first)AddMesa_inicial();Update_página(json);})
 .catch(error => console.log('deu '+error))

}
setInterval(Update_dados,5000)
Update_dados();

var dados_pedido_finalizado={
    'valor':100,
    'item':'Chocolates'
}
function entregar_pedido(){
    fetch('/'+restaurant+'/finish-order-data',{
        method:"POST",
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify({[code_mesa_atual]:{"solicitacao":['','','',['','']]}})
    })
    .then(resposta=>resposta.json())
    .then(json=>Update_dados())
    .catch(error=>console.error(error))
}

function register_add_mesa(mesaIndex,code_mesa,link_mesa){
    fetch('/'+restaurant+'/addMesa?code_mesa='+code_mesa+'&mesaIndex='+mesaIndex+'&link='+link_mesa)
    .then(resposta=>resposta.text())
    .then(text=> text)
    .catch(error=>console.log("f'Algo deu errado':'{error}'"))
}

function addMesa(elementAtual){
    let Mesas_array=document.getElementById('tableMenu_block');let mesaLenght=Mesas_array.children.length+1;code_mesa=gerar_code_mesa(5);
    
    if (window.innerWidth<600){add_mesa_real=false;
        
     if (mesaLenght-1 == 5 || Number.isInteger((count_mesas_notghost())/5)&&count_mesas_notghost()!=0)
      for(let mesa = 0; mesa<5;mesa++){
        new_mesa=document.createElement('li');let title_mesa=document.createElement('h3');let status_mesa=document.createElement('p');
        
         if (mesa != 0 && mesaLenght-1<1) new_mesa.classList.add('list_ghost');
         else if(mesaLenght-1<1){
            title_mesa.textContent='Mesa '+mesaLenght;status_mesa.textContent='Vazio';
            new_mesa.setAttribute('name','mesa '+mesaLenght);new_mesa.setAttribute('value','mesa '+code_mesa);
            new_mesa.setAttribute('onclick',"mesaLink('mesa "+mesaLenght+"','mesa "+code_mesa+"',this)"); 
         }
         else {new_mesa.classList.add('list_ghost');add_mesa_real=true;}
         console.log(mesaLenght-1)
         new_mesa.appendChild(status_mesa);
         new_mesa.appendChild(title_mesa);
         Mesas_array.appendChild(new_mesa);
    }
    if (mesaLenght-1< 5){
        new_mesa=document.createElement('li');let title_mesa=document.createElement('h3');let status_mesa=document.createElement('p');
         title_mesa.textContent='Mesa '+mesaLenght;status_mesa.textContent='Vazio';
         new_mesa.setAttribute('name','mesa '+mesaLenght);new_mesa.setAttribute('value','mesa '+code_mesa);
         new_mesa.setAttribute('onclick',"mesaLink('mesa "+mesaLenght+"','mesa "+code_mesa+"',this)");
          new_mesa.appendChild(status_mesa);
          new_mesa.appendChild(title_mesa);
          Mesas_array.appendChild(new_mesa);
    }
    function count_mesas_notghost(cond){
      if (!cond){
        return Mesas_array.querySelectorAll('li').length - Mesas_array.querySelectorAll('li[class="list_ghost"]').length;}
    }
     if (!(mesaLenght-1 <=5) && !Number.isInteger((count_mesas_notghost())/5) || add_mesa_real){
        new_mesa= Mesas_array.children[count_mesas_notghost()];
        title_mesa= new_mesa.querySelector('h3');
        status_mesa=new_mesa.querySelector('p');
      title_mesa.textContent='Mesa '+(count_mesas_notghost()+1);status_mesa.textContent='Vazio';
      new_mesa.setAttribute('name','mesa '+(count_mesas_notghost()+1));new_mesa.setAttribute('value','mesa '+code_mesa);
      new_mesa.setAttribute('onclick',"mesaLink('mesa "+(count_mesas_notghost()+1)+"','mesa "+code_mesa+"',this)");
       Mesas_array.children[count_mesas_notghost()].classList.remove('list_ghost');
     }
     if(Number.isInteger((count_mesas_notghost()-1)/5)&&!(count_mesas_notghost()<=1)){
         if (Number.isInteger((count_mesas_notghost()-1)/5) == 1){
           Mesas_array.style.padding= '8px 0 25px 0px';Mesas_array.style.textAlign= 'start';
           Mesas_array.style.justifyContent= 'space-around';
           Array.prototype.filter.call(Mesas_array.children,function(child){
            child.style.width= '80px';
        })
       }
         if (Number.isInteger((count_mesas_notghost()-1)/5) == 2)
           Mesas_array.style.padding= '8px 0 25px 0px';
    }else if((count_mesas_notghost()-1)/5<0.8){
        Mesas_array.style.justifyContent= 'center';Mesas_array.style.textAlign= 'center';
        Array.prototype.filter.call(Mesas_array.children,function(child){
            child.style.width= (100-20*(20*(5-mesaLenght)/100))/mesaLenght+'%';
         })
      }else{
        Mesas_array.style.justifyContent= 'space-around';
        Mesas_array.style.textAlign= 'start';
        Array.prototype.filter.call(Mesas_array.children,function(child){
            child.style.width= '80px';
        })
      }
    }
    link_mesa= '/'+restaurant+'/client-request/'+code_mesa;
    register_add_mesa(count_mesas_notghost(),code_mesa,link_mesa);
     linkElement=document.getElementById('formulário');mesaElement=linkElement.querySelector('input');
     linkElement.action= link_mesa;mesaElement.value=count_mesas_notghost();
     linkElement.submit();
    Update_dados();
}

function AddMesa_inicial(){
    let Mesas_array=document.getElementById('tableMenu_block');update_first=true;
    
    dados_array= [];
    for(let x =0;x<Object.keys(dados_restaurant["Mesas"]).length;x++)
     dados_array.push(get_mesa_and_code(x));
    for(code_mesa in organizar_array(dados_array)){
        mesa_array= dados_restaurant["Mesas"][organizar_array(dados_array)[code_mesa][0]];
         new_mesa=document.createElement('li');let title_mesa=document.createElement('h3');let status_mesa=document.createElement('p');
         title_mesa.textContent='Mesa '+mesa_array["settings"][0];
         status_mesa.textContent= mesa_array["settings"][2] ? 'Ocupado' : 'Vazio';
         new_mesa.setAttribute('name','mesa '+mesa_array["settings"][0]);new_mesa.setAttribute('value',organizar_array(dados_array)[code_mesa][0]);
         new_mesa.setAttribute('onclick',"mesaLink('mesa "+mesa_array["settings"][0]+"','"+organizar_array(dados_array)[code_mesa][0]+"',this)");
          new_mesa.appendChild(status_mesa);
          new_mesa.appendChild(title_mesa);
          Mesas_array.appendChild(new_mesa);
    }
    mesaLenght= Mesas_array.children.length;console.log(mesaLenght);
    if((Mesas_array.children.length-1)/5<0.8){
        Mesas_array.style.justifyContent= 'center';Mesas_array.style.textAlign= 'center';
        Array.prototype.filter.call(Mesas_array.children,function(child){
            child.style.width= (100-20*(20*(5-mesaLenght)/100))/mesaLenght+'%';
         })
    }else{
    Mesas_array.style.padding= '8px 0 25px 0px';Mesas_array.style.textAlign= 'start';
           Mesas_array.style.justifyContent= 'space-around';
           Array.prototype.filter.call(Mesas_array.children,function(child){
            child.style.width= '80px';
        })
    }
}
function get_mesa_and_code(index){
    return [Object.keys(dados_restaurant["Mesas"])[index],dados_restaurant["Mesas"][Object.keys(dados_restaurant["Mesas"])[index]]["settings"][0]]
}

function organizar_array(lista){
    lista_organizada= [];menor_number= ['maior',50];
 for(let lista_loop=0;lista_loop<lista.length;lista_loop++){
    menor_number= ['maior',50];
  for(let number=0;number<lista.length;number++){
    if(menor_number[1]>= lista[number][1]){
     if(lista_organizada.length!=0){
     if(lista[number][1]>lista_organizada[lista_organizada.length-1][1])
      {menor_number= lista[number];}}else
      menor_number= lista[number];
    }
  }
  lista_organizada.push(menor_number);
}
  return lista_organizada;
}


function nome_mesa_list(){
    var dados= {};
    for(let quant_list=1;quant_list<51;quant_list++){
        dados['mesa '+quant_list]= "Mesa "+quant_list;
    }
    return dados
}
var dados=nome_mesa_list();
