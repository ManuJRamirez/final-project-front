import { defaultImageController } from '../defaultImage/defaultImageController.js';
import { apiRest } from '../tools/apiRest.js';

export const postAd = async (formData, image) => {
  const endpoint = 'final-project/auth/nuevoanuncio';
  const imagenesList = [];

  if (!image) {
    image = (await defaultImageController()).imagen;
    imagenesList.push(image);
  }
  //let imageArrayByte = await loadImg(image);

  const body = {
    titulo: formData.get('titulo'),
    precio: formData.get('precio'),
    transacion: formData.get('transaccion'),
    descripcion: formData.get('descripcion'),
    listCategoria: Array.from(new FormData(adForm).getAll('tags')),
    imagen: imagenesList,
  };

  await apiRest().createAd(endpoint, body);
};

const loadImg = async imageFile => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = event => {
      const arrayBuffer = event.target.result;
      const uint8Array = new Uint8Array(arrayBuffer);
      resolve(uint8Array);
    };

    reader.onerror = error => {
      reject(error);
    };

    reader.readAsArrayBuffer(imageFile);
  });
};

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
