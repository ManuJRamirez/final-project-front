import { postAd, updateAd } from './postAdModel.js';
import { printEvent } from '../tools/printEvent.js';
import { getCategories } from '../categories-list/categoriesListModel.js';

export const postAdController = (adForm, adId) => {
  const postAdButton = document.getElementById('postAdButton');
  adForm.addEventListener('submit', async event => {
    postAdButton.disabled = true;
    event.preventDefault();

    const formData = new FormData(adForm);
    const fileInput = document.getElementById('imageInput');

    try {
      printEvent('adCreationPrintLoader', null, adForm);
      if (adId === null) {
        await postAd(formData, fileInput.files[0]);
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
        await updateAd(formData, fileInput.files[0], adId);
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
        window.location = '../index.html';
      }, 2000);
    } catch (error) {
      printEvent(
        'adCreation',
        {
          notificationType: 'error',
          message: 'Error al crear el anuncio. Intentelo de nuevo, por favor',
        },
        adForm,
      );
      postAdButton.disabled = false;
    } finally {
      printEvent('adCreationHideLoader', null, adForm);
    }
  });
};

export const loadInfoToEdit = (adInfo, adForm) => {
  if (adInfo !== null) {
    const parseAdInfo = JSON.parse(adInfo);
    localStorage.removeItem('infoAd');
    const titulo = adForm.querySelector('#name');
    const precio = adForm.querySelector('#price');
    const transacion = adForm.querySelector('#operationType');
    const descripcion = adForm.querySelector('#description');
    titulo.value = parseAdInfo.titulo;
    precio.value = parseAdInfo.precio;
    transacion.value = parseAdInfo.transacion;
    descripcion.value = parseAdInfo.descripcion;
  }
};

export const createCategoriesOptions = tagsSelect => {
  const categoria = getCategories()
    .then(categorias => {
      categorias.forEach(categoria => {
        const option = document.createElement('option');
        option.value = categoria.nombre;
        option.textContent = categoria.nombre;
        tagsSelect.appendChild(option);
      });
    })
    .catch(error => {
      console.error('Error al obtener las categorías:', error);
    });
};
export const selectOptions = () => {
  const selectElement = document.getElementById('tags');

  // Agregar un controlador de eventos 'change' al elemento select
  selectElement.addEventListener('change', () => {
    // Obtener todas las opciones seleccionadas
    const selectedOptions = Array.from(selectElement.selectedOptions);

    // Iterar sobre las opciones seleccionadas y actualizar su estilo de fondo
    selectedOptions.forEach(option => {
      option.style.backgroundColor = '#ccc'; // Cambia el color de fondo cuando está seleccionado
    });

    // Iterar sobre todas las opciones y restaurar el estilo de fondo de las no seleccionadas
    Array.from(selectElement.options).forEach(option => {
      if (!selectedOptions.includes(option)) {
        option.style.backgroundColor = ''; // Restaura el color de fondo predeterminado cuando no está seleccionado
      }
    });
  });
};

export const imagenes = imageForm => {
  imageForm.addEventListener('change', function (event) {
    const previewContainer = document.getElementById('imagePreview');
    previewContainer.innerHTML = '';

    const file = event.target.files[0]; // Solo tomamos el primer archivo seleccionado
    if (file) {
      const reader = new FileReader();
      reader.onload = function (e) {
        const image = document.createElement('img');
        image.src = e.target.result;
        image.alt = 'Imagen';
        image.classList.add('preview-image');
        previewContainer.appendChild(image); // Agregar la imagen al contenedor de vista previa
      };
      reader.readAsDataURL(file); // Leer el archivo como una URL de datos
    }
  });
};
