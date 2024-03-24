import { apiRest } from '../tools/apiRest.js';

export const postAd = async (formData, image) => {
  const endpoint = 'final-project/auth/nuevoanuncio';
  const imageUrl = await loadImg(image);

  const body = {
    titulo: formData.get('titulo'),
    precio: formData.get('precio'),
    transacion: formData.get('transaccion'),
    descripcion: formData.get('descripcion'),
  };

  if (imageUrl) {
    body.imagen = imageUrl;
  } else {
    body.imagen = './assets/media/product/p-2.png';
  }

  await apiRest().createAd(endpoint, body);
};

const loadImg = async image => {
  let imageUrl;

  try {
    const uploadManager = new Bytescale.UploadManager({
      apiKey: 'public_FW25biuB7FCTi4QPc78WebD9jExu',
    });

    const { fileUrl } = await uploadManager.upload({ data: image });

    imageUrl = fileUrl;
  } catch (error) {
    imageUrl = null;
  }

  return imageUrl;
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
