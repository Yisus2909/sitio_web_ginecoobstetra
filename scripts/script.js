document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('reservation-form');
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const phoneInput = document.getElementById('phone');
    const bornDateInput = document.getElementById('bornDate');
    const arrivalDateInput = document.getElementById('arrivalDate');
    const roomTypeInput = document.getElementById('roomType');
    const termsInput = document.getElementById('terms');
    const confirmationMessage = document.getElementById('confirmation-message');
  
    form.addEventListener('submit', (event) => {
        event.preventDefault(); // Prevenir envío si no es válido
        let isValid = true;
  
        console.log('Validando formulario...');
  
        // Validar Nombre
        if (!validateName(nameInput.value)) {
            showError(nameInput, 'El nombre debe tener al menos 3 caracteres y solo letras.');
            isValid = false;
        } else {
            hideError(nameInput);
        }

        // Validar Correo Electrónico
        if (!validateEmail(emailInput.value)) {
            showError(emailInput, 'El correo electrónico no es válido.');
            isValid = false;
        } else {
            hideError(emailInput);
        }

        // Validar Número de Teléfono
        if (!validatePhone(phoneInput.value)) {
            showError(phoneInput, 'El número de teléfono no es válido.');
            isValid = false;
        } else {
            hideError(phoneInput);
        }

        //Valida que la fecha de nacimiento no sea igual o mayor a la actual
        if (bornDateInput.value) {
            const bornDate = new Date(bornDateInput.value);
            const today = new Date();
            today.setHours(0, 0, 0, 0); // Asegurarse de comparar solo fechas (sin tiempo)
        
            // Validar que la fecha de llegada no sea menor o igual a la fecha actual
            if (bornDate >= today) {
                showError(bornDateInput, 'La fecha de nacimiento no puede ser mayor o igual a la fecha actual.');
                isValid = false;
            } else {
                hideError(bornDateInput);
            }
        }

        //Valida que la fecha de consulta no sea igual o mayor a la actual
        if (arrivalDateInput.value) {
            const arrivalDate = new Date(arrivalDateInput.value);
            const today = new Date();
            today.setHours(0, 0, 0, 0); // Asegurarse de comparar solo fechas (sin tiempo)
        
            // Validar que la fecha de llegada no sea menor o igual a la fecha actual
            if (arrivalDate <= today) {
                showError(arrivalDateInput, 'La fecha de llegada no puede ser menor o igual a la fecha actual.');
                isValid = false;
            } else {
                hideError(arrivalDateInput);
            }
        }

        // Validar Tipo de Habitación
        if (roomTypeInput.value === '') {
            showError(roomTypeInput, 'Selecciona un tipo de habitación.');
            isValid = false;
        } else {
            hideError(roomTypeInput);
        }

        // Validar términos y condiciones
        if (!termsInput.checked) {
            showError(termsInput, 'Debes aceptar los términos y condiciones.');
            isValid = false;
        } else {
            hideError(termsInput);
        }
  
        // Mostrar mensaje de confirmación si es válido
        if (isValid) {
            console.log('Formulario válido, mostrando mensaje de confirmación');
            confirmationMessage.style.display = 'block';
            confirmationMessage.textContent = alert('Agenda realizada con éxito!');
        } else {
            console.log('Formulario inválido');
        }
    });
  
    // Funciones de Validación

    // Función para validar nombre
    function validateName(name) {
        return /^[a-zA-Z\s]{3,}$/.test(name);
    }

    // Función para validar correo
    function validateEmail(email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }

    // Función para validar teléfono
    function validatePhone(phone) {
        return /^[0-9]{10}$/.test(phone); // Ajusta el formato según el número de teléfono deseado
    }

    // Mostrar error
    function showError(input, message) {
        const errorMessage = input.nextElementSibling;
        errorMessage.textContent = message;
        errorMessage.style.display = 'block';
        input.style.borderColor = '#ff4d4f';
    }

    // Ocultar error
    function hideError(input) {
        let errorMessage;
        if (input.type === 'checkbox') {
            errorMessage = input.parentElement.nextElementSibling;
        } else {
            errorMessage = input.nextElementSibling;
        }
    
        if (errorMessage) {
            errorMessage.textContent = '';
            errorMessage.style.display = 'none';
            input.style.borderColor = '#ddd';
        } else {
            console.error(`Elemento de mensaje de error no encontrado para el input con ID: ${input.id}`);
        }
    }
    
    
});

function toggleMenu() {
    const navLinks = document.querySelector('.nav-links');
    const menuIcon = document.querySelector('.menu-icon');

    navLinks.classList.toggle('active');
    menuIcon.classList.toggle('active'); // Agrega o elimina la clase 'active' en el ícono
    
    // Cambia el ícono a "X" si el menú está abierto, y de vuelta a "☰" si está cerrado
    if (navLinks.classList.contains('active')) {
        menuIcon.textContent = "✖"; // Cambia el icono a "X"
    } else {
        menuIcon.textContent = "☰"; // Cambia el icono de vuelta a ☰
    }
    }

    let lastScrollTop = 0; // Variable para registrar la última posición del scroll
    const header = document.querySelector('header'); // Selecciona el header completo
    
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset || document.documentElement.scrollTop;
    
        if (currentScroll > lastScrollTop) {
            // Si hacemos scroll hacia abajo, oculta el header
            header.classList.add('hidden');
        } else {
            // Si hacemos scroll hacia arriba, muestra el header
            header.classList.remove('hidden');
        }
    
        lastScrollTop = currentScroll <= 0 ? 0 : currentScroll; // Evita valores negativos
    });


    


    window.onload = function () {
        const popup = document.getElementById('popup');
        popup.classList.add('show'); // Muestra el pop-up al cargar
    };
    
    function closePopup() {
        const popup = document.getElementById('popup');
        popup.classList.remove('show'); // Oculta el pop-up al cerrar
    }