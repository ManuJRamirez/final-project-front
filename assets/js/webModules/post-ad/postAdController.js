import { postAd, updateAd } from './postAdModel.js';
import { printEvent } from '../tools/printEvent.js';
import { getCategories } from '../categories-list/categoriesListModel.js';

export const postAdController = (adForm, adId) => {
  const postAdButton = document.getElementById('postAdButton');
  adForm.addEventListener('submit', async event => {
    postAdButton.disabled = true;
    event.preventDefault();
    let createdAdId;

    const formData = new FormData(adForm);
    const fileInput = document.getElementById('imageInput');
    const imagenes = Array.from(fileInput.files).slice(0, 3);
    try {
      if (adId === null) {
        createdAdId = await postAd(formData, imagenes);
        printEvent(
          'adCreation',
          {
            notificationType: 'success',
            message: '¡Felicidades!¡Anuncio creado correctamente',
          },
          adForm,
        );
      } else {
        localStorage.removeItem('adId');
        await updateAd(formData, imagenes, adId);
        printEvent(
          'adCreation',
          {
            notificationType: 'success',
            message: '¡Felicidades!¡Anuncio actualizado correctamente',
          },
          adForm,
        );
      }
      setTimeout(() => {
        window.location.href = `./detalle-anuncio.html?id=${createdAdId.id}?${createdAdId.titulo}`;
      }, 2000);
    } catch (error) {
      //alert('Error al crear el anuncio, intentelo de nuevo mas tarde.');
      postAdButton.disabled = false;
    }
  });
};

export const loadInfoToEdit = (adInfo, adForm) => {
  if (adInfo !== null) {
    const parseAdInfo = JSON.parse(adInfo);
    localStorage.removeItem('infoAd');
    const titulo = adForm.querySelector('#titulo');
    const precio = adForm.querySelector('#precio');
    const transacion = adForm.querySelector('#transacion');
    const listCategoria = adForm.querySelector('#tags');
    const descripcion = adForm.querySelector('#descripcion');
    const imagen = adForm.querySelector('#imageList');
    titulo.value = parseAdInfo.titulo;
    precio.value = parseAdInfo.precio;
    transacion.value = parseAdInfo.transacion;
    descripcion.value = parseAdInfo.descripcion;
    listCategoria.value = parseAdInfo.listCategoria;
    imagen.value = parseAdInfo.imagen;
  }
};
/*
export const createCategoriesOptions = async () => {
  try {
    // Obtener las categorías
    const categorias = await getCategories();

    // Crear el elemento <select>
    const selectElement = document.createElement('select');
    selectElement.id = 'tags';
    //selectElement.classList.add('form-control');
    selectElement.multiple = true;
    selectElement.required = true;

    // Iterar sobre las categorías y crear opciones para cada una
    categorias.forEach(categoria => {
      const option = document.createElement('option');
      option.value = categoria.id;
      option.textContent = categoria.nombre;
      selectElement.appendChild(option);
    });

    // Devolver el elemento <select> creado
    return selectElement;
  } catch (error) {
    console.error('Error al obtener las categorías:', error);
    return null;
  }
};*/

export const createCategoriesOptions = async tagsSelect => {
  const categoria = await getCategories()
    .then(categorias => {
      categorias.forEach(categoria => {
        const option = document.createElement('option');
        option.value = categoria.id;
        option.textContent = categoria.nombre;
        option.setAttribute('value', categoria.id);
        tagsSelect.appendChild(option);
      });
    })
    .catch(error => {
      console.error('Error al obtener las categorías:', error);
    });
};

export const selectOptions = () => {
  const selectElement = document.getElementById('tags');

  selectElement.addEventListener('mousedown', event => {
    const clickedOption = event.target;

    if (clickedOption.tagName === 'OPTION') {
      clickedOption.selected = !clickedOption.selected;
      updateBackgroundColor(selectElement);
      event.preventDefault();
    }
  });
};
const updateBackgroundColor = selectElement => {
  Array.from(selectElement.options).forEach(option => {
    option.style.backgroundColor = option.selected ? 'lightblue' : '';
  });
};

/*
export const selectOptions = () => {
  const selectElement = document.getElementById('tags');
  selectElement.addEventListener('mousedown', () => {
    const selectedOptions = Array.from(selectElement.selectedOptions);
    //selectedOptions.forEach(option => {});

    Array.from(selectElement.options).forEach(option => {
      if (!selectedOptions.includes(option)) {
        option.style.backgroundColor = '';
      }
    });
  });
};
*/

export const handleImageUpload = event => {
  const imageList = document.getElementById('imageList');
  const files = event.target.files;
  // Limitar el número de imágenes a 3
  if (files.length + imageList.children.length > 3) {
    alert('Solo se pueden subir hasta 3 imágenes.');
    return;
  }
  for (const file of files) {
    displayImage(file);
  }
};

export const displayImage = file => {
  const imageListItem = document.createElement('li');
  imageListItem.classList.add('image-list-item');

  const imageName = document.createTextNode(file.name);
  const deleteButton = document.createElement('button');
  deleteButton.textContent = 'X';

  deleteButton.addEventListener('click', () => {
    imageListItem.remove();
  });

  imageListItem.appendChild(imageName);
  imageListItem.appendChild(deleteButton);
  imageList.appendChild(imageListItem);
};
