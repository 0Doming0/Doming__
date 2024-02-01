var table_pedidos= document.getElementById("table_pedidos");
var pedidos= table_pedidos.querySelectorAll("li");
var pedido_information= document.getElementById('pedido_information');

function click_Pedido(pedido){
  pedido_information.style.display="block";
  pedido_information.querySelector('p').textContent= pedido.querySelector('h3').textContent;
}

function click_Seletor(botao){
  form= botao.parentNode
  form.submit()
}