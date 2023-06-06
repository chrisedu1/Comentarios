
  // Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.1/firebase-app.js";
  import { getDatabase, ref, set, child } from "https://www.gstatic.com/firebasejs/9.22.1/firebase-analytics.js";
  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries

  // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  const firebaseConfig = {
    apiKey: "AIzaSyB87_oZ6dAlLdVqcMcDewpqttPFy4EUKsM",
    authDomain: "logica-c535f.firebaseapp.com",
    projectId: "logica-c535f",
    storageBucket: "logica-c535f.appspot.com",
    messagingSenderId: "217487030260",
    appId: "1:217487030260:web:8809e4a7ddb6ca38baeba1",
    measurementId: "G-MV0E389T50"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);

  var textoMensaje = document.getElementById('nuevoComentario');
  var mensajesChat = document.getElementById('comentarios');

  textoMensaje.onkeydown = async function(event){
    if (event.key == "Enter"){
      var db = getDatabase();
      var referenciaMensajes = ref(db, "comments");
      var nuevaLlave = push( child(ref(db), "comments") ).key;
      var nuevosDatos = {
        [nuevaLlave]: {
          mensaje: textoMensaje.value 
        }
      }
      textoMensaje.value = ""
      update(referenciaMensajes, nuevosDatos);
  
    }
  } 

  function escucharYDibujarMensajes (){
    //Recuperamos la base de datos de Firebase
    var db = getDatabase();
    //Creamos la referencia al mensaje.
    var referenciaMensajes = ref(db, "comments");
    //Escuchamos cuando hay nuevos mensajes
    onValue(referenciaMensajes, function(datos){
         var valoresObtenidos = datos.val();
         mensajesChat.innerHTML = "";
         Object.keys(valoresObtenidos).forEach(llave=>{
             var mensajeDescargado = valoresObtenidos[llave];
             var mensaje = "";
             mensaje += "<div class='mensajes-chat'>" + mensajeDescargado.mensaje +"</div>";
             mensaje += "<div>" + mensajeDescargado.fecha +"</div><hr></hr>";
             mensajesChat.innerHTML += mensaje;
  
  
             
         })
         mensajesChat.scrollTo(0, mensajesChat.scrollHeight)
    },
    (error)=>{
     console.log(error)
    }
    )
  }

function nComentario(){
    let li = document.createElement("li");
    let valoringresado = document.getElementById("nuevoComentario").value;
    let text = document.createTextNode(valoringresado);
    li.appendChild(text);

    if(valoringresado == ''){
        alert("Ingrese un comentario!")
    } else{
        document.getElementById("comentarios").appendChild(li);
    }

    document.getElementById("nuevoComentario").value = "";
    li.className = "comentario";

    let borrar = document.createElement("p");
    borrar.innerHTML = ("Borrar");
    borrar.className = ("close");
    li.appendChild(borrar);

    let close = document.getElementsByClassName("close");
    let i;
    for (i = 0; i < close.length; i++){
        close[i].onclick = function(){
            let div = this.parentElement;
            div.style.display = "none";
        }
    }
}

