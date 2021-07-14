  
const db = firebase.firestore();
var variable_almacenada;

boton_obtener.addEventListener('click', () => {
    const obteniendoTareas = (unaFuncionX) => { db.collection("orden_en_proceso").onSnapshot(unaFuncionX); }
    obteniendoTareas((tarea) => {
        tarea.forEach((demo) => {
            var obtener_estado = document.getElementById("Obtenerestado").value
            variable_almacenada = demo.data().orden;
            variable_almacenada = variable_almacenada.substr(1, variable_almacenada.length - 2)
            if (obtener_estado == variable_almacenada) { 
                document.getElementById("Estado").value =demo.data().estado
                
                }
             
        })
    })
})
