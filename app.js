document.addEventListener("DOMContentLoaded", () => {
    // 1. Diseño de la interfaz
    document.body.style.backgroundColor = "#f0f2f5";
    document.body.style.fontFamily = "Arial, sans-serif";
    document.body.style.textAlign = "center";
    document.body.style.padding = "20px";

    const container = document.createElement("div");
    container.style.maxWidth = "600px";
    container.style.margin = "0 auto";
    
    const titulo = document.createElement("h1");
    titulo.innerText = "Panel de Reservas AP-TURNOS";
    
    const card = document.createElement("div");
    card.style.background = "white";
    card.style.padding = "30px";
    card.style.borderRadius = "10px";
    card.style.boxShadow = "0 4px 8px rgba(0,0,0,0.1)";
    card.style.marginTop = "20px";

    const tituloCard = document.createElement("h3");
    tituloCard.innerText = "Seleccione un servicio";

    const select = document.createElement("select");
    select.style.padding = "8px";
    select.style.fontSize = "16px";
    select.style.borderRadius = "5px";
    
    const opciones = [
        { valor: "padel", texto: "Turno Cancha de Padel" },
        { valor: "clase", texto: "Clase con Profesor" },
        { valor: "torneo", texto: "Inscripcion a Torneo" },
        { valor: "peluqueria", texto: "Peluqueria" },
        { valor: "medico", texto: "Turno Medico" }
    ];

    opciones.forEach(op => {
        const option = document.createElement("option");
        option.value = op.valor;
        option.innerText = op.texto;
        select.appendChild(option);
    });

    const btn = document.createElement("button");
    btn.innerText = "Consultar Disponibilidad";
    btn.style.padding = "10px 20px";
    btn.style.marginTop = "20px";
    btn.style.backgroundColor = "#27ae60";
    btn.style.color = "white";
    btn.style.border = "none";
    btn.style.borderRadius = "5px";
    btn.style.cursor = "pointer";
    btn.style.fontSize = "16px";
    btn.style.display = "block";
    btn.style.marginLeft = "auto";
    btn.style.marginRight = "auto";

    card.appendChild(tituloCard);
    card.appendChild(select);
    card.appendChild(btn);
    container.appendChild(titulo);
    container.appendChild(card);
    document.body.appendChild(container);

    // 2. Inyección dinámica de Firebase
    const scriptApp = document.createElement("script");
    scriptApp.src = "https://www.gstatic.com/firebasejs/10.4.0/firebase-app-compat.js";
    document.body.appendChild(scriptApp);

    const scriptDB = document.createElement("script");
    scriptDB.src = "https://www.gstatic.com/firebasejs/10.4.0/firebase-firestore-compat.js";
    document.body.appendChild(scriptDB);

    // 3. Inicialización de base de datos con tus credenciales reales
    scriptDB.onload = () => {
        const firebaseConfig = {
            apiKey: "AIzaSyBaIoJ6c7U1E_YGHDjuP3fXehqFOb-MqMY",
            authDomain: "ap-turnos.firebaseapp.com",
            projectId: "ap-turnos",
            storageBucket: "ap-turnos.firebasestorage.app",
            messagingSenderId: "362178464205",
            appId: "1:362178464205:web:48624c7ee600b8d8755c84",
            measurementId: "G-K7DTFN97VJ"
        };
        
        firebase.initializeApp(firebaseConfig);
        const db = firebase.firestore();

        // 4. Acción del botón para guardar en la nube
        btn.addEventListener("click", async () => {
            const seleccion = select.options[select.selectedIndex].text;
            btn.innerText = "Guardando...";
            btn.disabled = true;
            
            try {
                // Guardamos el dato en la colección "turnos"
                await db.collection("turnos").add({
                    servicio: seleccion,
                    fecha: new Date().toISOString(),
                    estado: "pendiente"
                });
                alert("¡Turno guardado correctamente en Firebase!");
            } catch (error) {
                console.error("Error Firebase: ", error);
                alert("Error al guardar. Revisa la consola.");
            } finally {
                btn.innerText = "Consultar Disponibilidad";
                btn.disabled = false;
            }
        });
    };
});