const div1= document.querySelector("div");
const div2= div1.querySelector("div");
const section= document.getElementsByTagName("section")[0];
let valor=1;

function update(){
  
}
let mouse_status;
let mouse_enter;
window.addEventListener("mousedown",()=>{mouse_status=true;enter_loop()});
window.addEventListener("mouseup",()=>mouse_status=false);
section.addEventListener("mouseenter",(e)=>{mouse_enter=true;enter_loop()});
section.addEventListener("mouseleave",(e)=>mouse_enter=false);
 
function enter_loop(){
  if (!mouse_enter || !mouse_status) return;
  console.log("mouse Dentro")
  requestAnimationFrame(enter_loop);
}
