export const comprimirImagen = async (image, maxFileSizeKB) => {
  return new Promise((resolve, reject) => {
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
    const img = new Image();

    img.onload = function () {
      const width = img.width;
      const height = img.height;

      canvas.width = width;
      canvas.height = height;

      context.drawImage(img, 0, 0, width, height);

      // Convierte la imagen en base64 con diferentes niveles de calidad para alcanzar el tamaño de archivo deseado
      let quality = 1.0;
      let compressedDataUrl = canvas.toDataURL('image/jpeg', quality);
      while (compressedDataUrl.length / 1024 > maxFileSizeKB && quality > 0.1) {
        quality -= 0.1;
        compressedDataUrl = canvas.toDataURL('image/jpeg', quality);
      }

      const blob = dataURItoBlob(compressedDataUrl);
      resolve(blob);
    };

    img.onerror = function (error) {
      reject(error);
    };

    img.src = URL.createObjectURL(image);
  });
};

// Función para convertir una data URI en un blob
const dataURItoBlob = dataURI => {
  const byteString = atob(dataURI.split(',')[1]);
  const mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];
  const ab = new ArrayBuffer(byteString.length);
  const ia = new Uint8Array(ab);
  for (let i = 0; i < byteString.length; i++) {
    ia[i] = byteString.charCodeAt(i);
  }
  return new Blob([ab], { type: mimeString });
};
