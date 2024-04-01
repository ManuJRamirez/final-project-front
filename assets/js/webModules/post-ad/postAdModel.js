import { defaultImageController } from '../defaultImage/defaultImageController.js';
import { apiRest } from '../tools/apiRest.js';

export const postAd = async (formData, images) => {
  const endpoint = 'final-project/auth/nuevoanuncio';
  const imagenesList = [];

  if (images && images.length > 0 && images.length <= 3) {
    for (const image of images) {
      imagenesList.push(await convertirImagenABase64(image));
    }
  } else {
    const defaultImage = (await defaultImageController()).imagen;
    imagenesList.push(defaultImage);
  }

  const body = {
    titulo: formData.get('titulo'),
    precio: formData.get('precio'),
    transacion: formData.get('transacion'),
    descripcion: formData.get('descripcion'),
    listCategoria: Array.from(new FormData(adForm).getAll('tags')),
    imagen: imagenesList,
  };

  const response = await apiRest().createAd(endpoint, body);
  return response;
};

async function convertirImagenABase64(imageFile) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = event => {
      const base64String = event.target.result.split(',')[1];
      resolve(base64String);
    };

    reader.onerror = error => {
      reject(error);
    };

    reader.readAsDataURL(imageFile);
  });
}

export const updateAd = async (formData, image, adId) => {
  const idObj = JSON.parse(adId);
  const endpoint = `api/commercial/${idObj.id}`;
  const imageUrl = await loadImg(image);
  const body = {
    titulo: formData.get('name'),
    precio: formData.get('price'),
    transacion: formData.get('operationType'),
    descripcion: formData.get('description'),
  };

  if (imageUrl) {
    body.image = imageUrl;
  } else {
    body.image = 'noImage';
  }

  await apiRest().updateAd(endpoint, body);
};
