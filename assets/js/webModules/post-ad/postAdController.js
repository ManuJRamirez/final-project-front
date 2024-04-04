import { postAd } from './postAdModel.js';
import { printEvent } from '../tools/printEvent.js';

export const postAdController = (adForm, adId) => {
  const postAdButton = document.getElementById('postAdButton');
  adForm.addEventListener('submit', async event => {
    postAdButton.disabled = true;
    event.preventDefault();
    let createdAdId;

    const formData = new FormData(adForm);
    const fileInput = document.getElementById('imageInput');
    const imagenes = Array.from(fileInput.files).slice(0, 3);
    const select = document.getElementById('tags');

    try {
      if (adId === null && select.value.length !== 0) {
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
