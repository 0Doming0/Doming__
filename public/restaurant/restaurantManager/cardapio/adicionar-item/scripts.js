window.onload = init
const form = document.getElementsByTagName('form')[0]
const categoria = new URLSearchParams(window.location.search).get("cat")
const palavras_ofensivas = ['porra','caralho','capeta','piroca','semen','reboceteio','buceta',
'chapado','doidao']

function init(){
    const inputs = form.querySelectorAll('input')
    const descricao = form.querySelector('textarea')
    const container_info = document.getElementById('container-info')
    form.addEventListener('submit',(event)=>{
     if (inputs[0].value.length > 35){
        event.preventDefault()
        console.log("Por favor escolha um nome mais curto de até 24 caracteres")
     }
     if (parseFloat(inputs[1].value) > 300){
        event.preventDefault()
        console.log("Valor muito alto! Por favor escolha um valor de até R$300")
     }
     if (!verificar_palavras_ofensivas()){
        event.preventDefault()
        console.log("Palavra imprópria encontrada em seu nome")  
        return  
     }
     if (verificar_quantidade_caracter()){
        event.preventDefault()
        console.log("Não tem caracter suficiente!")
        return;
     }
     form.querySelector("input[name='cat']").value = categoria
     console.log("Enviando formulário")
    })
    const char_values = [',','.']
    inputs[0].addEventListener('focus',()=>{
        container_info.textContent = "Dê um nome ao seu produto. Por exemplo:"
        container_info.style.display = "block"
        
    })
    inputs[1].addEventListener('focus',()=>{
        container_info.textContent = "Dê um valor ao seu produto de até R$ 500"
        container_info.style.display = "block"
        
    })
    inputs[0].addEventListener("blur",function(){
        if (inputs[0].value.length > 0)
         this.style.width = "80%"
        else this.style.width = "auto";
    })
    inputs[1].addEventListener("blur",()=>{
        
    })
    inputs[1].addEventListener("input",()=>{
        last_char = inputs[1].value[inputs[1].value.length-1]
        if (!(!isNaN(last_char) || char_values.includes(last_char))|| last_char ==" ")
         inputs[1].value = inputs[1].value.slice(0,-1)
    })
    descricao.addEventListener('focus',()=>{
        container_info.textContent = "Dê uma descrição do seu produto por exemplo"
        container_info.style.display = "block"
    })
    const input_text = [inputs[0],descricao]  
    function verificar_palavras_ofensivas(){
      let palavra_imprópria_encontrada = false;
      input_text.forEach((input)=>{
        let palavras = input.value.split(" ")
        for (let palavra_index=0; palavra_index<palavras.length; palavra_index++){
         let palavra = palavras[palavra_index]
         if (palavras_ofensivas.includes(palavra)){
            palavra_imprópria_encontrada = true;
         }
        }
      })
      return !palavra_imprópria_encontrada;
    }
    function verificar_quantidade_caracter(){
      let campo_insuficiente = false; 
      campos = input_text
      campos.push(inputs[1])
      campos.forEach((input)=>{
        if (input.value.length == 0){
         campo_insuficiente = true;
         console.log(input.value)
        }
      }) 
      return campo_insuficiente;
    }
}