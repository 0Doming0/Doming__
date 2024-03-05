var descricao_order_confirm= document.getElementById('descricao_order_confirmation');

const pedidos_container = document.getElementById("meu-pedido_pag")
function pedido_toggle () {
  if (pedidos_container.style.display != "block")
    pedidos_container.style.display = "block"
  else 
    pedidos_container.style.display = "none"
}

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

// guardar --
// 10/(Math.pow(font_length,1.35)/font_length*4.5)*18+'px';

// const roll_page= document.getElementById("roll-page");
// if (roll_page != null){
// const pages_roll= roll_page.querySelectorAll("div[name='page']");
// pages_roll[1].querySelector("section").style.display = "none";
// }
// let valor_roll=0;

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