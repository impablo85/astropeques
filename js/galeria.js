document.addEventListener('DOMContentLoaded', function() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const galleryItems = document.querySelectorAll('.gallery-item');

    // Crear el lightbox
    const lightbox = document.createElement('div');
    lightbox.className = 'lightbox';
    lightbox.innerHTML = `
        <div class="lightbox-content">
            <button class="close-lightbox">&times;</button>
            <img src="" alt="" class="lightbox-image">
        </div>
    `;
    document.body.appendChild(lightbox);

    // Añadir estilos necesarios
    const styles = document.createElement('style');
    styles.textContent = `
        .lightbox {
            display: none;
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: rgba(0, 0, 0, 0.9);
            z-index: 1000;
            justify-content: center;
            align-items: center;
        }
        
        .lightbox.active {
            display: flex;
        }
        
        .lightbox-content {
            position: relative;
            max-width: 90%;
            max-height: 90%;
        }
        
        .lightbox-image {
            max-width: 100%;
            max-height: 90vh;
            object-fit: contain;
        }
        
        .close-lightbox {
            position: absolute;
            top: -40px;
            right: 0;
            background: none;
            border: none;
            color: white;
            font-size: 30px;
            cursor: pointer;
            padding: 5px 10px;
        }
        
        .close-lightbox:hover {
            color: #ddd;
        }
    `;
    document.head.appendChild(styles);

    // Manejar la funcionalidad de filtrado
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            const filterValue = button.getAttribute('data-filter');

            galleryItems.forEach(item => {
                if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
                    item.style.display = 'block';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    });

    // Manejar la funcionalidad del lightbox
    galleryItems.forEach(item => {
        const img = item.querySelector('img');
        if (img) {
            img.style.cursor = 'pointer';
            img.addEventListener('click', () => {
                const lightboxImg = lightbox.querySelector('.lightbox-image');
                lightboxImg.src = img.src;
                lightboxImg.alt = img.alt;
                lightbox.classList.add('active');
            });
        }
    });

    // Cerrar el lightbox
    const closeButton = lightbox.querySelector('.close-lightbox');
    closeButton.addEventListener('click', () => {
        lightbox.classList.remove('active');
    });

    // Cerrar el lightbox al hacer clic fuera de la imagen
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) {
            lightbox.classList.remove('active');
        }
    });

    // Cerrar el lightbox con la tecla ESC
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && lightbox.classList.contains('active')) {
            lightbox.classList.remove('active');
        }
    });
});