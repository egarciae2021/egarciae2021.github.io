const storageRef = firebase.storage().ref();
const baseDeDatos = firebase.firestore();
const miBoton = document.getElementById("miBoton");
var fichero = document.getElementById("fichero");
miBoton.addEventListener('click', subirImagenAFirebase);
const BtnRegresar=document.getElementById("BtnRegresar")

BtnRegresar.addEventListener('click',()=>{ 
    window.location.href =window.location.origin+'/Bodegaseleccionada.html' 
}
)


function registrarEnBaseDeDatos(paramRuta, paramProducto, paramPrecio) {

    baseDeDatos.collection("comentarios").doc().set(
        {
            producto: paramProducto,
            precio: paramPrecio,
            ruta: paramRuta
        }
    ).then(() => {
        document.getElementById("producto").value = ""
        document.getElementById("precio").value = ""

        console.log("Document successfully written!");
        alert("Comentario registrado correctamente")
    })
}
function subirImagenAFirebase() {
    var imagenASubir = fichero.files[0];
    if (imagenASubir!= null) {
        var tarea = storageRef.child(imagenASubir.name).put(imagenASubir);
        tarea.on('state_changed',
            //FuncionMientasCarga()
            function (estado) {
                var progreso = (estado.bytesTransferred / estado.totalBytes) * 100;
                console.log('Upload is ' + progreso + '% done');
            }
            ,
            function (error) {
            },
            function () {
                var producto2 = document.getElementById("producto").value
                var precio2 = document.getElementById("precio").value
                console.log("termino de cargar")
                tarea.snapshot.ref.getDownloadURL().then(function (ruta) {
                    registrarEnBaseDeDatos(ruta, producto2, precio2);
                });

            }
        )
    }
    else{
        alert("No has colocado una imagen")
    }
 };
