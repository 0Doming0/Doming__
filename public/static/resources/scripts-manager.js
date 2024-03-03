function verificar_hashFunction () {
    hash = window.location.hash.substring(1)
    if (hash == "|options")
     expandir_recolher("expandir")
    else expandir_recolher("recolher")
}
const header = document.getElementsByTagName("header")[0]
const header_main = header.querySelector("section")
verificar_hashFunction()
function expandir_recolher (command) {
  hash = window.location.hash.substring(1)  
  if (command == "expandir") {
    header_main.style.left = "0"
    header.style.bottom = "-134.8px"
    header.classList.toggle("header_closing")
    console.log ("Fechando")
    return
  }
  if (command == "recolher") {
    header_main.style.left = "-100%"
    header.style.bottom = "-5px"
    header.classList.toggle("header_opening")
    return
  }
  if (command.parentNode.tagName != null) {
    container = command.parentNode
  }
  if (!command.classList.contains("active_button")) {
    command.style.border = "none"
    if (container.tagName == "HEADER")
      header_main.style.left = "-100%"
  }
  else {
    command.style.border = "1px solid var(--dotted-color)"
    if (container.tagName == "HEADER")
      header_main.style.left = "0"  
  }
  command.classList.toggle("active_button")
  if (container.tagName == "HEADER") {
    container.classList.toggle("header_closing")
    container.classList.toggle("header_opening")
  }
  else {
    container.classList.toggle("disable-container")
    container.classList.toggle("active-container")
  }
}
var inputs_ = Array.from(header_main.querySelector("div[name='manager-main']").querySelectorAll("input"))
const form_add = document.getElementById("formulário_add")
if (form_add != undefined)
  inputs_.push(form_add.querySelector("input[type='text']"))
if (inputs_ != undefined)
inputs_.forEach(input => {
  input.addEventListener("input", (event) => {
    const input = event.target
    if (input.getAttribute("name") != "number") return
    input.value = input.value.replace(/[^0-9]/g, '')
    inputLength = input.value.length
    inputString = ''
    for (index = 0; index<inputLength;index++) {
      if (index > 10) break
      if (index == 2 || index == 7)
       if (index == 7)
        inputString += '-'+input.value[index]
       else 
        inputString += ' '+input.value[index]
      else 
        inputString += input.value[index]
    }
      input.value = inputString
  });
  input.addEventListener("blur",function(event){
    const input = event.target
    if (input.value.length > 3)
      input.setAttribute("placeholder",input.value)
    input.value = ''
  });
})