document.addEventListener("DOMContentLoaded", function() {
    const contactList = document.getElementById("contact-list");
    const addContactForm = document.getElementById("add-contact-form");

    // Función para cargar la lista de contactos desde la API
    function cargarContactos() {
        fetch("https://www.raydelto.org/agenda.php")
            .then(response => response.json())
            .then(data => {
                contactList.innerHTML = "";

                data.forEach(contact => {
                    const li = document.createElement("li");
                    li.textContent = `${contact.nombre} ${contact.apellido} - ${contact.telefono}`;
                    contactList.appendChild(li);
                });
            })
            .catch(error => console.error("Error al cargar la lista de contactos:", error));
    }

    // Para Cargar los Datos una vez  la página carga.
    cargarContactos();

    // Evento para agregar un nuevo contacto
    addContactForm.addEventListener("submit", function(event) {
        event.preventDefault();

        const nombre = document.getElementById("nombre").value;
        const apellido = document.getElementById("apellido").value;
        const telefono = document.getElementById("telefono").value;

        // Objeto JSON con las siguientes variables (Nombre, Apellido Telefono).
        const nuevoContacto = {
            nombre: nombre,
            apellido: apellido,
            telefono: telefono
        };

        // Solicitud POST para enviar datos a rayldeto.org
        fetch("https://www.raydelto.org/agenda.php", {
            method: "POST",
            // headers: {
            //     "Content-Type": "application/json"
            // },
            body: JSON.stringify(nuevoContacto)
        })
        .then(() => {
            cargarContactos(); // Retornar los ultimos contactos agregados.
            addContactForm.reset(); // Reinicia el Formulario para futuros nuevos inputs.
        })
        .catch(error => console.error("Error al agregar un nuevo contacto:", error));
    });
});
