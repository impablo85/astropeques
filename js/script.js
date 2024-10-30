document.addEventListener('DOMContentLoaded', () => {
    const buttons = document.querySelectorAll('.item-content');
    const contents = document.querySelectorAll('.tab-content');

    // Mostrar el primer tab por defecto
    if (contents.length > 0) {
        contents[0].classList.add('active');
        buttons[0].classList.add('active');
    }

    buttons.forEach(button => {
        button.addEventListener('click', () => {
            // Obtener el ID del contenido a mostrar desde el atributo data-target
            const targetId = button.getAttribute('data-target');
            
            // Ocultar todos los contenidos
            contents.forEach(content => {
                content.classList.remove('active');
            });

            // Desactivar todos los botones
            buttons.forEach(btn => {
                btn.classList.remove('active');
            });

            // Mostrar el contenido correspondiente
            const targetContent = document.getElementById(targetId);
            if (targetContent) {
                targetContent.classList.add('active');
                button.classList.add('active');
            }

            // Hacer scroll suave hacia el contenido
            targetContent.scrollIntoView({ behavior: 'smooth' });
        });
    });
});