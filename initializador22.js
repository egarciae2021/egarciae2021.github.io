var validar_usuario = function (a){
    if(((document.getElementById("usuario_login").value).length<1) || ((document.getElementById("clave_login").value).length<1)){
        alert("No has enviado informacion")
    }
    else{
    getData(a)
    } 
    }

var crear_cuenta = function(b){
   Registrar(b)   
}

var codigo_recuperacion = function(c){
      //   if(document.getElementById("buton3"))
      //   {
      //    console.log("ya existe 1 creado")
      //   }
      //   else{
      //    var aux = document.createElement("input");
      //    aux.value="";
      //    aux.id="codigo_recuperar"; 
      //    document.documentElement.appendChild(aux);
      //    var buton2 = document.createElement("input");
      //   buton2.type="button";
      //   buton2.value="Validar";
      //   buton2.id="buton3";
      //   document.documentElement.appendChild(buton2);
      //   }
        Recuperar_clave(c);
      }

var validar_zona = function(d){
      console.log(d)
      d.remove()
   
      }

var inicio = function(){
   listar_bodegas();
}

const listar_bodegas = (data) => {
   var xhr2
   xhr2 = new XMLHttpRequest()
       xhr2.open('GET', 'http://0.tcp.sa.ngrok.io:14072/proyecto/Execute_Procedures4.php')
       xhr2.addEventListener('load', (data) => {            
       const dataJSON = JSON.parse(data.target.response)
       var i=0
       for (var keys in dataJSON) {
           var valor = dataJSON[keys]  
           console.log(valor.length )
           for( x= 0 ; valor.length > x ;x++)
           {    
 
               var division = document.createElement("div")
               division.className="box_tienda"
               
               var imagen = document.createElement("img")
               imagen.src= "./multimedia/"+2+".jpeg"
               imagen.width="300"
               imagen.height="300"
               
               var titulo = document.createElement("h2")
               titulo.textContent=valor[x].razon_social 
               
               var division2 = document.createElement("div")
               division2.className="box_comprar"
               
               var parrafo = document.createElement("p")
               parrafo.textContent="Pedido minimo S/." + valor[x].pedido_minimo +".00" 
               
               var buton = document.createElement("a")
               buton.className="btn_green"
               buton.type="button"
               buton.href="bodegaseleccionada.html"
               buton.textContent="Comprar"
               
               division.appendChild(division2)
               division.appendChild(imagen)
               division.appendChild(titulo)
               division.appendChild(parrafo)
               division.appendChild(buton)
               
               document.getElementsByClassName("tiendas")[0].appendChild(division);

           }
       }    
           })
          
       xhr2.send()
}

 const getData = (data) => {
    console.log("getdata")
      var  xhr 
      xhr = new XMLHttpRequest()
          xhr.open('POST', 'http://0.tcp.sa.ngrok.io:14072/proyecto/Execute_Procedures.php')
          const formData = new FormData(data)
          xhr.addEventListener('load', (data) => {   
          const dataJSON = JSON.parse(data.target.response)
          var i=0
          for (var keys in dataJSON) {
              var valor = dataJSON[keys]  
               if(valor!=""){
              for( x= 0 ; valor.length > x ;x++)
              {
                  console.log(valor[x].Name );
                  window.location.replace("confirmar_dirección.html");
              }  
                             }    
               else{
                  alert("Usuario y/o Contraseña Incorrecta")
               }
                                      }    
                                                                 })
              xhr.send(formData)
          }   

const Registrar = (data) => {
      var  xhr 
      xhr = new XMLHttpRequest()
          xhr.open('POST', 'http://0.tcp.sa.ngrok.io:14072/proyecto/Execute_Procedures2.php')
          const formData = new FormData(data)
          xhr.addEventListener('load', (data) => { 
          const dataJSON = JSON.parse(data.target.response)
          alert(dataJSON)
            if(dataJSON=='Registrado Correctamente ,¡Bienvenido!'){
                window.location.replace("PaginaInicio.html");
        }
                                                                 })
              xhr.send(formData)
          }   

const Recuperar_clave = (data) => {
            var  xhr 
            xhr = new XMLHttpRequest()
                xhr.open('POST', 'http://0.tcp.sa.ngrok.io:14072/proyecto/Execute_Procedures3.php')
                const formData = new FormData(data)
                xhr.addEventListener('load', (data) => { 
                const dataJSON = JSON.parse(data.target.response)
                  alert(dataJSON)
                                                                       })
                    xhr.send(formData)
                }   
