var pedido_information= document.getElementById('pedido_information');

function click_Pedido(pedido){
  pedido_information.style.display="block";
  pedido_information.querySelector('p').textContent= pedido.querySelector('h3').textContent;
}
function click_Seletor(botao){
  form= botao.parentNode
  form.submit()
}
function pedido_focus (pedido) {
  pedido.classList.add("active_pedido");
  Array.from(pedido.parentNode.children).forEach((elemento) => {
    if (elemento != pedido)
     if (elemento.classList.contains("active_pedido"))
      elemento.classList.remove("active_pedido")
  })
  
}
console.log (header_main)