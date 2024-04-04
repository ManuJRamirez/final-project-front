import { getOneAd } from '../ad-specification/adSpecificationModel.js';
import { handleImageUpload } from '../tools/handleImageUpload.js';

export const actualizarAnuncioController = async (adInfoUpdate, adId) => {
  try {
    //const ad = await getOneAd(adId);
  } catch (error) {}
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
