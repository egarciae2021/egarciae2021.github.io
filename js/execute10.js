let now = new Date();
var p =JSON.stringify(now);
const db = firebase.firestore();
 
var p2=p.replace(':','');
var p3=p2.replace(':','');
var p4=p3.replace('-','');
var p5=p4.replace('-','');
const termino=document.getElementById("termino_pago")

termino.addEventListener('click',()=>{
    localStorage.setItem('Numero_orden', p5);
 
})

var buttonFinalizar= document.getElementById("termino_pago")

buttonFinalizar.addEventListener('click',()=>
{

    var tienda_seleccion=localStorage.getItem("tienda_seleccionada")
    var orden_generada=localStorage.getItem("orden")
    var n_orden=localStorage.getItem("Numero_orden")
    
    db.collection("orden_en_proceso").doc().set(
        {
           tienda:tienda_seleccion,
           pedido:orden_generada,
           orden:n_orden,
           estado:"proceso",
    
        }
    ).then((snapshot) => {
        console.log("guardado");
         
        window.location.href =window.location.origin+'/agradecimiento.html' 
        
      }).catch((error) => {
        console.error(error);
      }); 


}

)
