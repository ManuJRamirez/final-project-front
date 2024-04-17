import { defaultImageController } from '../defaultImage/defaultImageController.js';
import { apiRest } from '../tools/apiRest.js';
import { convertirImagenABase64 } from '../tools/convertirImagenABase64.js';
import { comprimirImagen } from '../tools/comprimirImg.js';

export const postAd = async (formData, images) => {
  const endpoint = 'final-project/auth/nuevoanuncio';
  const imagenesMap = new Map();

  if (images && images.length > 0 && images.length <= 3) {
    for (const image of images) {
      const compressedImage = await comprimirImagen(image, 200);
      imagenesMap.set(image.name, await convertirImagenABase64(compressedImage));
    }
  } else {
    const defaultImage = (await defaultImageController()).imagen;
    imagenesMap.set('default.png', defaultImage);
  }

  const body = {
    titulo: formData.get('titulo'),
    precio: formData.get('precio'),
    transacion: formData.get('transacion'),
    descripcion: formData.get('descripcion'),
    listCategoria: Array.from(new FormData(adForm).getAll('tags')),
    imagenes: Object.fromEntries(imagenesMap),
  };

  const response = await apiRest().createAd(endpoint, body);
  return response;
};
