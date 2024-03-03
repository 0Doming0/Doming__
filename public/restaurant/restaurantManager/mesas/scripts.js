import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-app.js";
import { getDatabase, ref, set, child, get, onValue } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-database.js";


const active = document.getElementsByClassName("active")[0];
active.querySelector("img").style.setProperty("--width-image","40px");

let execução;
function list_container (main) {
    if (execução) return;
    let section = document.querySelectorAll(".section-page[name = 'main']")[main.parentNode.getAttribute("name")]
    let section_info = document.getElementsByClassName("section-info")[main.parentNode.getAttribute("name")]
    if (main.classList.contains("beforeGreen")){
     execução = true
     section.classList.remove("page-show")   
     main.classList.remove("beforeGreen")
     section.classList.add("page-hide")
     setTimeout(()=> {
        section_info.style.display = "block"
        section.style.display = "none"
        section.classList.remove("page-hide")
        section.style.transform = "translateY(105%)"
        execução = false
     },550)
    }
    else{
     execução = true   
     section_info.style.display = "none"
     main.classList.add("beforeGreen")
     section.style.display = "flex"
     section.classList.add("page-show")
     setTimeout(()=>execução = false,550)
    }
}

document.addEventListener("click",(element)=>{const tagName = element.target.tagName
    if (tagName == "BODY" || tagName == "HTML")
     window.location.hash = ""
})
const section_main = document.getElementsByClassName("section-page")[0]
const referenceItem_section_main = section_main.children[0].cloneNode(true)
section_main.children[0].remove()
const main_info = document.getElementById("main-info")
var Adicionou_mesa = false
function criar_mesas (list) {
    const mesas_array = Object.keys(list)
    let mesas_atuais = []
    Array.from(section_main.children).forEach((mesa) => {
        mesas_atuais.push(mesa.querySelector("p[name='title']").textContent)
    })
    mesas_array.forEach((mesa) => {
        if (mesas_atuais.includes (mesa)) return
        let id = list[mesa].id
        let mesa_div = referenceItem_section_main.cloneNode(true)
        section_main.append(mesa_div)
        mesa_div.setAttribute("name", id+'')
        mesa_div.querySelector("p[name='title']").textContent = mesa
        let estado = list[mesa].estado ? "ocupada" : "disponível"
        mesa_div.querySelector("p[name='cliente']").textContent = estado
        if (Adicionou_mesa)
          destacar_elemento(mesa_div, 6)
        if (list[mesa].estado)
          mesa_div.classList.add("mesa_ocupada")
    })
    section_main.style.display = "flex"
    main_info.textContent = "Atenda as chamadas dos clientes nas mesas"
}
function atualizar_mesas (list) {
    const mesas_array = Object.keys(list)
    const mesas_atuais = Array.from(section_main.children)
    mesas_array.forEach((mesa) => {
      mesas_atuais.forEach((mesa_atual) => {
        if (list[mesa].estado) {
          if (mesa == mesa_atual.querySelector("p[name='title']").textContent)
            if (!mesa_atual.classList.contains("mesa_ocupada")) {
              mesa_atual.classList.add("mesa_ocupada")
              mesa_atual.querySelector("p[name='cliente']").textContent = "ocupada"
            }
        }
        else
          if (mesa == mesa_atual.querySelector("p[name='title']").textContent)
            if (mesa_atual.classList.contains("mesa_ocupada")) {
              mesa_atual.classList.remove("mesa_ocupada")
              mesa_atual.querySelector("p[name='cliente']").textContent = "disponível"
            }
      })
    })
}

const db_mesas = (async function () {
    const FIREBASE_CONFIG = await fetch ("/.netlify/functions/retornar-dados").then(response => response.json())
    const app = initializeApp(FIREBASE_CONFIG.keys)
    const db = getDatabase(app)
    const dbRef = ref(db)
    function read_static_ () {
        onValue(ref(db,"Lacro/mesas"),(snapshot) => {
            if (snapshot.exists())
              atualizar_mesas(snapshot.val())
        })
    }
    function add_ (nome, id) {
        const url = window.location.origin+"/restaurant/client-request/"+id;
        set(ref(db, "Lacro/mesas/"+nome), {
            id: id,
            url: url,
            estado: false
        })
    }
    async function read_ (nome) {
        let snapshot = ''
        if (nome == undefined) {
         snapshot = await get(child(dbRef, "Lacro/mesas"))
        }
        else
         snapshot = await get(child(dbRef, "Lacro/mesas/"+nome))

        if (snapshot.exists()) 
         return snapshot.val()
        else {
         return false
        }
    }
    return {
        add: add_,
        read: read_,
        read_static: read_static_,
    } 
})()
db_mesas.then((db) => db.read_static())
function form_button_animation (input) {
    input.value = "Nova mesa criada!"
    input.style.border = "none"
    setTimeout(() => {
        input.value = "Integre nova mesa"
        input.style.border = "1px solid black"
    }, 2000)
}
function destacar_elemento (elemento, tempo) {
    elemento.classList.add("destaque")
    setTimeout (() => {
        elemento.classList.remove("destaque")
    }, tempo * 1000)
}
form_add.addEventListener("submit",  (event) => {
    event.preventDefault();
    let form = event.target
    let button = form.querySelector("input[type='submit']")
    const name = form.querySelector("input[type='text']").value.length > 0 ? form.querySelector("input[type='text']").value : form.querySelector("input[type='text']").placeholder
    const id = número_de_mesas
    db_mesas.then((db) => {
        db.add(name, id)
    });
    Adicionou_mesa = true
    update_número_de_mesas ()
    form_button_animation(button)
});
var número_de_mesas
function update_número_de_mesas () {
db_mesas.then(async (db) => {
    let mesas_list = await db.read()
    if (mesas_list != false) {
     número_de_mesas = Object.keys(mesas_list).length +1
     if (número_de_mesas > 0)
      criar_mesas(mesas_list)
    }
    else
     número_de_mesas = 1
    let form_add_name = form_add.querySelector("input[type = 'text']")
    form_add_name.setAttribute("placeholder", "Mesa "+número_de_mesas)
    form_add_name.textContent = ''
})
}
update_número_de_mesas();
window.addEventListener("hashchange", (event) => {

    const hash = window.location.hash.substring(1)
    if (hash == '') return
    if (hash == 'add') {section_main.appendChild(mesa_div); section_main.style.display = "flex"}
    window.location.hash = ''
})
