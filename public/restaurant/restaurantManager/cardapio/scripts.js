const pagina_adicionar= document.getElementById("pag_adicionar-produto");
const pagina_adicionar_catalogo = document.getElementById("pag_adicionar-catálogo")
const pagina_cardápio = document.getElementById("page_cardápio")
const params = new URLSearchParams(window.location.search)
const active = document.getElementsByClassName("active")[0];
active.querySelector("img").style.setProperty("--width-image","40px");

if (params.get("cat") != null)
 window.onload = adicionar_produto;

function pag_adicionar_catálogo(){
    pagina_adicionar_catalogo.style.display= "block";
}
function adicionar_produto(){
    if (params.size == 0) return;
    let inputs = pagina_adicionar.querySelectorAll("input")
    let textarea = pagina_adicionar.querySelector("textarea")
    const nome= params.get("nome")
    const valor= params.get("valor")
    const categoria= params.get("cat")
    descrição= textarea.value; 
    other = pagina_cardápio.querySelector("li").cloneNode(true)
    div_info = other.querySelector("div[name='informação']")
     div_info.querySelector("h4").textContent= nome
     div_info.querySelector("span").textContent= "R$ "+ parseFloat(valor).toFixed(2);
     
     cardápio_pages[categoria].querySelector("div[name='page']").appendChild(other)
     button= cardápio_pages[categoria].querySelector("div[name='page']").querySelector("a[name = 'adicionar-item']")
     console.log(button)
     cardápio_pages[categoria].querySelector("div[name='page']").appendChild(button)
     other.style.display= "flex";
}
let cardápio_pages = pagina_cardápio.querySelectorAll("ul");

function ir_catálogo(main){
    cardápio_pages = Array.from(cardápio_pages);
    page = cardápio_pages.filter((element)=>{
        return element.getAttribute("name") === main.textContent;
        })
    valor_roll_cardápio = cardápio_pages.indexOf(page[0])
    cardápio_pages.forEach((element)=>{
        if (element != page[0])
         element.querySelector("div[name='page']").style.display= "none"
    })
    page[0].querySelector("div[name='page']").style.display= "block";
    pagina_cardápio.style.left= -valor_roll_cardápio*100+"%";
}
function status_item(main,status){
    point = main.querySelector("div[name = 'point']")
    content = main.querySelector("span")
    const green_color = getComputedStyle(document.documentElement).getPropertyValue("--green-color")
    if (status == "destaque"){
     console.log("Produto em destaque!")
     if (point.style.left == "70%"){
      point.style.left = "0%"
      point.style.outlineColor= "rgb(180, 180, 180)"
     } 
     else{
      point.style.left = "70%"
      point.style.outlineColor= green_color
      point.style.backgroundColor= "white";
     }
    }
    if (status == "desativar"){
     if (point.style.left == "70%"){
      content.textContent = "desativado"  
      point.style.left = "0%"
      point.style.outlineColor= "rgb(180, 180, 180)"
     } 
     else{
      content.textContent = "ativado"  
      point.style.left = "70%"
      point.style.outlineColor= green_color;
      point.style.backgroundColor= "white";
     }
    }
}
const header = document.querySelector("header")
const header_main = header.querySelector("section")
function verificar_hashFunction () {
    hash = window.location.hash.substring(1)
    if (hash == "|options")
     expandir_recolher("expandir")
    else expandir_recolher("recolher")
}
verificar_hashFunction()
function expandir_recolher (command) {
  hash = window.location.hash.substring(1)  
  if (command == "expandir") {
    header_main.style.left = "0"
    header.style.bottom = "-134.8px"
    header.classList.toggle("header_closing")
    return
  }
  if (command == "recolher") {
    header_main.style.left = "-100%"
    header.style.bottom = "-5px"
    header.classList.toggle("header_opening")
    return
  }
  if (!command.classList.contains("active_button")) {
    command.style.border = "none"
    header_main.style.left = "-100%"
  }
  else {
    command.style.border = "1px solid var(--dotted-color)"  
    header_main.style.left = "0"
  }
  command.classList.toggle("active_button")
  header.classList.toggle("header_closing")
  header.classList.toggle("header_opening")
}
