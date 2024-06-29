// Evento para registro (signin)
document.getElementById('registerForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const formData = new FormData(event.target);

    // Aquí deberías guardar los datos del usuario en tu base de datos o sistema de almacenamiento
    // Ejemplo de fetch mock para guardar los datos en el servidor
    fetch('/signup', {
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            alert('Registro exitoso. Inicie sesión con su nueva cuenta.');
            window.location.href = 'login.html'; // Redirige al inicio de sesión
        } else {
            alert('Error al registrarse: ' + data.message);
        }
    });
});

// Evento para inicio de sesión (login)
document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const formData = new FormData(event.target);

    fetch('/login', {
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            window.location.href = 'roles.html'; // Redirige a la página de asignación de roles
        } else {
            alert('Error al iniciar sesión: ' + data.message);
        }
    });
});
document.getElementById('infoButton').addEventListener('click', function() {
    var infoContent = document.getElementById('infoContent');
    if (infoContent.classList.contains('hidden')) {
        infoContent.classList.remove('hidden');
    } else {
        infoContent.classList.add('hidden');
    }
});
