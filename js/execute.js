//conexion a base de datos
const db = firebase.firestore();
const taskContainer1 = document.getElementById("task-container1");
const taskContainer2 = document.getElementById("task-container2");
const taskContainer3 = document.getElementById("task-container3");
const taskContainer4 = document.getElementById("task-container4");
const comentarios=document.getElementById("calificaciones");
var tienda_seleccionada = localStorage.getItem('tienda_seleccionada');
const cabecera = document.getElementById("cabecera")
almacenamiento_general = [];
var precio;
contenedor = [];
almacenamiento_abarrotes = [];
almacenamiento_botanas = [];
almacenamiento_confiteria = [];
almacenamiento_enlatados = [];
var index;
var orden = []; 
const dejar_comentario=document.getElementById("dejar_comentarios")

dejar_comentario.addEventListener('click',(e)=>{
    e.preventDefault;
    window.location.href="./Registar_comentario.html"

})



var description = localStorage.getItem("descripcion_bodega");
cabecera.innerHTML=cabecera.innerHTML+`<p>`+description +`</p>`;
document.getElementById("nombre_bodega").innerHTML= tienda_seleccionada


const obteniendoTareas = (unaFuncionX) => { db.collection("comentarios").onSnapshot(unaFuncionX); }

obteniendoTareas((tarea) => {
    tarea.forEach((demo) => {
         variable_almacenada= demo.data();
         comentarios.innerHTML= comentarios.innerHTML+  `
        <div class="comentarios">
        <img src="`+variable_almacenada.ruta+`" alt="" width="100" height="100">
        <p><strong>`+variable_almacenada.producto +`</strong></p>
        <p>`+variable_almacenada.precio +`</p>

        </div>
        `            })
}
)

function ubicarindex(arrary1, palabra) {
    for (i = 0; i < arrary1.length; i++) {
        if (arrary1[i].includes(palabra)) {
            index = i;
        }
    }
}

function disminuir(enviado) {
    var ClaseObjeto2 = enviado.className;
    var disponibles = enviado.getAttribute("name");
    var valoractual = parseInt(document.getElementById(ClaseObjeto2).value);
    if (valoractual == parseInt(disponibles)) { }
    if (valoractual > parseInt(disponibles) || valoractual == 0) { document.getElementById(ClaseObjeto2).value = 0 }
    else {
        valoractual = valoractual - 1;
        document.getElementById(ClaseObjeto2).value = valoractual;
    }
    array_a_modificar = almacenamiento_general[enviado.parentNode.parentNode.parentNode.id];
    ubicarindex(array_a_modificar, ClaseObjeto2)
    array_a_modificar[index] = ClaseObjeto2 + ":" + (disponibles - valoractual)
    almacenamiento_general[enviado.parentNode.parentNode.parentNode.id] = array_a_modificar;
}

function aumentar(enviado) {
    var ClaseObjeto3 = enviado.className;
    var disponibles2 = enviado.getAttribute("name");
    var valoractual2 = parseInt(document.getElementById(ClaseObjeto3).value);
    if (valoractual2 >= parseInt(disponibles2)) { }
    else {
        valoractual2 = valoractual2 + 1;
        document.getElementById(ClaseObjeto3).value = valoractual2;
    }

    array_a_modificar = almacenamiento_general[enviado.parentNode.parentNode.parentNode.id];
    ubicarindex(array_a_modificar, ClaseObjeto3)
    array_a_modificar[index] = ClaseObjeto3 + ":" + (disponibles2 - valoractual2)
    almacenamiento_general[enviado.parentNode.parentNode.parentNode.id] = array_a_modificar;
}

db.collection("inventario").where("nombre", "==", tienda_seleccionada).get().then((querySnapshot2) => {
     querySnapshot2.forEach((doc2) => {
        var arrayDeabarrotes = doc2.data().abarrotes;
        var arrayDebotana = doc2.data().botanas;
        var arrayDeconfiteria = doc2.data().confiteria;
        var arrayDeenlatados = doc2.data().enlatados;
        almacenamiento_abarrotes = arrayDeabarrotes;
        almacenamiento_botanas = arrayDebotana;
        almacenamiento_confiteria = arrayDeconfiteria;
        almacenamiento_enlatados = arrayDeenlatados;
        almacenamiento_general = [almacenamiento_abarrotes, almacenamiento_botanas, almacenamiento_confiteria, almacenamiento_enlatados]
        almacenamiento_general2 = ["almacenamiento_abarrotes", "almacenamiento_botanas", "almacenamiento_confiteria", "almacenamiento_enlatados"]
        contenedor = [taskContainer1, taskContainer2, taskContainer3, taskContainer4]

        for (z = 0; z < contenedor.length; z++) {
            for (i = 0; i < almacenamiento_general[z].length; i++) {
                var producto = almacenamiento_general[z][i].split(":");
                precio = Math.trunc(Math.random() * 10) + 0.5;
                contenedor[z].innerHTML = contenedor[z].innerHTML + `<div id="` + z + `">
            <label><li>`+ producto[0] + ` (S/.` + precio + `)</il>
            <input type="button" value="+" id ="up" class="`+ producto[0] + `" name ="` + producto[1] + ` "></input>
            <input type="button" value="-" id ="down" class="`+ producto[0] + `" name ="` + producto[1] + ` "></input> 
            <input type="text"   value="0"  size="1" id="`+ producto[0] + `" readonly class="orden" name="` + precio + `"></input>
            </div>
             `;
            }
        }
    });

    const btnDwn = document.querySelectorAll("#down");
    btnDwn.forEach(
        (boton) => {
            boton.addEventListener("click", (e) => {
                e.preventDefault;
                disminuir(boton);
            }
            )
        }
    )
    const btnUp = document.querySelectorAll("#up");
    btnUp.forEach(
        (boton) => {
            boton.addEventListener("click", (e) => {
                e.preventDefault;
                aumentar(boton);
            }
            )
        }
    )

});


const boton4 = document.getElementById("miBoton");
boton4.addEventListener('click', () => {
    console.log("enviado")
    db.collection("inventario").doc(tienda_seleccionada).update(
        {
            abarrotes: almacenamiento_abarrotes,
            botanas: almacenamiento_botanas,
            confiteria: almacenamiento_confiteria,
            enlatados: almacenamiento_enlatados
        }
    ).then((snapshot) => {
        console.log("guardado");
        localStorage.setItem('orden', JSON.stringify(orden));
     window.location.href="/PrevioPago.html"
          
        
      }).catch((error) => {
        console.error(error);
      }); 
    orden = [];
    const ordenes = document.querySelectorAll(".orden");
    ordenes.forEach((g) => {
        if (g.value > 0) {
            orden.push([g.getAttribute("id") + ":" + g.value + ":" + g.name])
        }
    }
    )
   

}
)




