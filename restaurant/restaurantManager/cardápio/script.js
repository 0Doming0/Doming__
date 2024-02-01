function click_Seletor(botao){
    form= botao.parentNode
    form.submit()
}
function action_produto(action, produto){
    produto= produto.parentNode;
    if (action == "remove") console.log("removendo produto");
    if (action == "pause") console.log("pausando produto");
}
function adicionar_produto(){
    pagina= document.getElementById("pag_adicionar-produto");
    pagina.style.display= "flex";
}

