const db = firebase.firestore();
var distritos = [];
lista_valor = document.getElementById("lista_desplegable");
mostrar_contenido = document.getElementById("tiendas2");


db.collection("cobertura").doc("yjCfnOVxrUOD0odWB32U").get().then((doc) => {
    distritos = doc.data().distritos;
    for (i = 0; i < distritos.length; i++) {
        if (i == 0) {
            lista_valor.innerHTML = lista_valor.innerHTML + `<option selected="yes">--Seleccione--</option>`
            lista_valor.innerHTML = lista_valor.innerHTML + `<option >` + distritos[i] + `</option>`

        }
        else {
            lista_valor.innerHTML = lista_valor.innerHTML + `<option>` + distritos[i] + `</option>`
        }
    }
})

lista_valor.addEventListener('change', () => {
    console.log(mostrar_contenido)
    mostrar_contenido.innerHTML = ` `;
    
    var portadas = ["https://firebasestorage.googleapis.com/v0/b/proyecto-eb125.appspot.com/o/bodega4.jpeg?alt=media&token=0b6b8faa-c509-4a9c-89dd-5183d7020e42", "https://firebasestorage.googleapis.com/v0/b/proyecto-eb125.appspot.com/o/bodega3.jpeg?alt=media&token=90d17b2c-517d-4343-b9c4-a303a73fbab0", "https://firebasestorage.googleapis.com/v0/b/proyecto-eb125.appspot.com/o/bodega2.jpeg?alt=media&token=ada67efb-4d24-4dfa-8525-359d1e1f32cb", "https://firebasestorage.googleapis.com/v0/b/proyecto-eb125.appspot.com/o/Bodega1.jpeg?alt=media&token=8944409d-9bd0-4a31-98e4-4e01f65ff9ee"]
    db.collection("empresas").where("distrito", "==", lista_valor.value).get().then((e) => {
        e.forEach(element => {
            localStorage.setItem('descripcion_bodega',element.data().descripcion  );
            mostrar_contenido.innerHTML = mostrar_contenido.innerHTML +
            `<div class="box_tienda line">
                    <div></div>
                    <img src="`+ portadas[Math.trunc(Math.random() * 4)] + `" class="`+ element.data().nombre+`" id="imagenes" width="400" height="400" >
                    <h1>`+ element.data().nombre + `</h1>
                        <div class="box_comprar">
                             
                            <p>Pedido mínimo : S/.`+ element.data().pedido + `.00 </p>
                             
                        </div>
            </div> `
  
        });

                        const btnRedirrecionar = document.querySelectorAll("#imagenes");
                        btnRedirrecionar.forEach(
                         (boton5) => {
                            boton5.addEventListener('click', (mo) => {
                                console.log(boton5.className)
                                localStorage.setItem('tienda_seleccionada', boton5.className);
                                window.location.href = "./Bodegaseleccionada.html"
                            }
                            )
                        }
                        )
    }


                        )


}
                        )


