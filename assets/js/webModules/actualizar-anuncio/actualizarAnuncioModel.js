export const postAd = async (formData, images, adId) => {
  const endpoint = `final-project/auth/actualizaranuncio/${adId}`;
  const imagenesMap = new Map();

  if (images && images.length > 0 && images.length <= 3) {
    for (const image of images) {
      imagenesMap.set(image.name, await convertirImagenABase64(image));
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

  const response = await apiRest().updateAd(endpoint, body);
  return response;
};
