// function enviar() {
//     var email = document.getElementById("email").value;
//     var contra = document.getElementById("pass").value;

//     //codigo firebase: inicio
//     firebase.auth().createUserWithEmailAndPassword(email, contra)
//         .then((userCredential) => {
//             // Signed in
//             var user = userCredential.user;
//             // ...
//         })
//         .catch((error) => {
//             var errorCode = error.code;
//             var errorMessage = error.message;
//             // ..
//             alert(errorMessage);
//         });
//     //codigo firebase: fin
// }
const db = firebase.firestore();

function acceso() {
    var email = document.getElementById("email").value;
    var pass = document.getElementById("pass").value;

    //codigo firebase: inicio
    firebase.auth().signInWithEmailAndPassword(email, pass)
        .then((userCredential) => {
            
            var user = userCredential.user;
            localStorage.setItem('correo_registrado', email)
            alert("¡Bienvenido!");

            db.collection("empresas").where("correo", "==", email)
                .get()
                .then((querySnapshot) => {
                    querySnapshot.forEach((doc) => {
                         localStorage.setItem('Dueno_de_empresa', doc.id)
                       
                    });
                })
                .catch((error) => {
                    localStorage.removeItem('Dueno_de_empresa')

                    console.log("Error getting documents: ", error);
                });




            //window.location.href = "/confirmar_dirección.html"



        })
        .catch((error) => {
            var errorCode = error.code;
            var errorMessage = error.message;
            alert(errorMessage);
        });
    //codigo firebase: fin
}


// function cerrar() {
//     firebase.auth().signOut()
//         .then(function () {
//             console.log("salir");
//         })
//         .catch(function (error) {
//             console.log("error");
//         })
// }

firebase.auth().onAuthStateChanged((user) => {
    if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User
        var uid = user.uid;
        // ...
        //document.getElementById("login").innerHTML = "Logueado " + user.email;
        //  document.getElementById("login").innerHTML =
        //     `<p>Logueado ` + user.email + `</p>` +
        //     `<button onclick=cerrar();>Cerrar sesion</button>`;
    } else {
        // User is signed out
        // ...
        document.getElementById("login").innerHTML = "No logueado";
    }
});



const boton_acceso = document.getElementById("logeo")
boton_acceso.addEventListener('click', () => {
    console.log("Intento de Login");
    acceso()
})
