emailjs.init('OVU_YIV8_eY0HFr0D');  // Reemplaza por tu Public Key

function validarFormulario() {
    const nombre = document.getElementById('nombre').value.trim();
    const email = document.getElementById('email').value.trim();
    const sugerencia = document.getElementById('sugerencia').value.trim();

    if (nombre === '') {
        alert("Por favor, ingresa tu nombre.");
        return false;
    }

    if (email === '') {
        alert("Por favor, ingresa tu correo electrónico.");
        return false;
    }

    if (sugerencia === '') {
        alert("Por favor, escribe una sugerencia.");
        return false;
    }

    if (!validarEmail(email)) {
        alert("Por favor, ingresa un correo electrónico válido.");
        return false;
    }

    return true;
}

function validarEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}

const form = document.getElementById('sugerenciaform');
const respuesta = document.getElementById('respuesta');

form.addEventListener('submit', function(event) {
    event.preventDefault(); 
    if (!validarFormulario()) {
        return;
    }

    const formData = new FormData(form);

    const emailParams = {
        from_name: formData.get('nombre'),
        from_email: formData.get('email'),
        message: formData.get('sugerencia'),
    };

    emailjs.send('service_mtd684m', 'template_zzzhjk5', emailParams)
        .then(function(response) {
            console.log('Correo enviado exitosamente:', response);
            respuesta.style.display = 'block';
            respuesta.innerHTML = '¡Gracias por tu sugerencia!';
            form.reset(); 
        }, function(error) {
            console.log('Error al enviar el correo:', error);
            respuesta.style.display = 'block';
            respuesta.innerHTML = 'Lo sentimos, hubo un error al enviar tu sugerencia. Por favor, inténtalo nuevamente.';
        });
});
