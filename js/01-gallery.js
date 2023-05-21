import { galleryItems } from './gallery-items.js';

const gallery = document.querySelector('.gallery');
let modalInstance = null; // Змінна для збереження посилання на відкрите модальне вікно

// Рендер розмітки елементів галереї
const renderGallery = () => {
const galleryMarkup = galleryItems.map(({ preview, original, description }) => {
    return `<li class="gallery__item">
            <a class="gallery__link" href="${original}">
            <img class="gallery__image" 
            src="${preview}" 
            data-source="${original}" 
            alt="${description}" />
            </a>
            </li>`;
    });

gallery.insertAdjacentHTML('beforeend', galleryMarkup.join(''));
};

renderGallery();

// Обробник кліку на елементах галереї
const handleGalleryClick = (event) => {
    event.preventDefault();
    let clickedItemEl = event.target;
        if (clickedItemEl.nodeName !== 'IMG') {
    return;
}

    let bigImage = clickedItemEl.dataset.source;
    openBigImage(bigImage);
};

gallery.addEventListener('click', handleGalleryClick);

function openBigImage(largeImageUrl) {
    const modal = basicLightbox.create(
        `<img src="${largeImageUrl}" width="800" height="600" alt="" />`,
        { onShow: () => {
            document.addEventListener('keydown', handleKeyDown); // Прослуховувач події натискання клавіші
        },
        onClose: () => {
            document.removeEventListener('keydown', handleKeyDown); // Видалити прослуховувач події натискання клавіші
            modalInstance = null;
        },
        });

    modal.show();
    modalInstance = modal;
    }

function handleKeyDown(event) {
    if (event.key === 'Escape') {
        closeModal();
    }
}

function closeModal() {
    if (modalInstance) {
    modalInstance.close();
    }
}
