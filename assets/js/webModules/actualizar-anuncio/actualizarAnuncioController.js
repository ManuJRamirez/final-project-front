import { getOneAd } from '../ad-specification/adSpecificationModel.js';
import {
  handleImageUpload,
  obtenerListImagenes,
} from '../tools/handleImageUpload.js';
import { putAd } from './actualizarAnuncioModel.js';
import { printEvent } from '../tools/printEvent.js';

export const actualizarAnuncioController = async (adInfoUpdate, adId) => {
  const putAdButton = document.getElementById('putAdButton');

  adForm.addEventListener('submit', async event => {
    putAdButton.disabled = true;
    event.preventDefault();
    let updateAdId;
    const formData = new FormData(adInfoUpdate);
    // const fileInput = document.getElementById('imageInput');
    const imagenes = Array.from(obtenerListImagenes.values());
    try {
      updateAdId = await putAd(formData, imagenes, adId);
      printEvent(
        'adUpdate',
        {
          notificationType: 'success',
          message: '¡Felicidades!¡Anuncio actualizado correctamente',
        },
        adInfoUpdate,
      );
      setTimeout(() => {
        window.location.href = `./detalle-anuncio.html?id=${updateAdId.id}?${updateAdId.titulo}`;
      }, 2000);
    } catch (error) {
      printEvent(
        'loginNotification',
        {
          notificationType: 'error',
          message: 'Error al intentar actualizar el artículo',
        },
        adInfoUpdate,
      );
      putAdButton.disabled = false;
    }
  });
};

export const loadInfoToEdit = async (adId, adInfoUpdate) => {
  if (adId !== null) {
    const ad = await getOneAd(adId);
    const listCategorias = adForm.querySelector('#tags');
    const categoriasSelected = ad.listCategoria;
    const imagen = ad.listImagenes;
    titulo.value = ad.titulo;
    precio.value = ad.precio;
    transacion.value = ad.transacion;
    descripcion.value = ad.descripcion;
    categoriasSelected.forEach(value => {
      Array.from(listCategorias.options).forEach(option => {
        if (option.textContent === value) {
          option.selected = true;
          option.style.backgroundColor = option.selected ? 'lightblue' : '';
        }
      });
    });
    handleImageUpload(event, imagen);
  } else {
    printEvent(
      'adLoadError',
      {
        notificationType: 'error',
        message:
          'No se ha podido cargar la información del anuncio correctamente',
      },
      adInfoUpdate,
    );
  }
};
