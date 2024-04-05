let mapImagenes = new Map();

export const handleImageUpload = (event, imagen) => {
  const imageList = document.getElementById('imageList');
  if (event !== undefined) {
    const files = event.target.files;
    // Limitar el número de imágenes a 3
    if (files.length + imageList.children.length > 3) {
      alert('Solo se pueden subir hasta 3 imágenes.');
      return;
    }
    for (const file of files) {
      displayImage(file.name, file);
    }
  } else {
    const files = imagen;
    for (const file of files) {
      displayImage(file.nombre, file);
    }
  }
  
};

const displayImage = (nombre, file) => {
  const imageListItem = document.createElement('li');
  imageListItem.classList.add('image-list-item');

  const imageName = document.createTextNode(nombre);
  const deleteButton = document.createElement('button');
  deleteButton.textContent = 'X';

  deleteButton.addEventListener('click', () => {
    imageListItem.remove();
    eliminarImagen(imageListItem);
  });

  imageListItem.appendChild(imageName);
  imageListItem.appendChild(deleteButton);
  imageList.appendChild(imageListItem);

  agregarImagen(imageListItem, file)
};

export const obtenerListImagenes = mapImagenes;

const agregarImagen = (imagenContainer, imagen) => {
  mapImagenes.set(imagenContainer, imagen);
};

const eliminarImagen = imagenContainer => {
  mapImagenes.delete(imagenContainer);
};
