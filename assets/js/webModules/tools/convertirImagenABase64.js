export const convertirImagenABase64 = async imageFile => {
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
};
