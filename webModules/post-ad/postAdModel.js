import { sparrestApi } from "../tools/sparrestApi.js";

export const postAd = async (formData, image) => {
    const endpoint = "api/commercial";
    const imageUrl = await loadImg(image);

    const dateNow = new Date();
    const date = dateNow.toString();

    const body = {
        name: formData.get("name"),
        price: formData.get("price"),
        opType: formData.get("operationType"),
        description: formData.get("description"),
        date: date,
    };

    if(imageUrl) {
        body.image =imageUrl;
    } else {
        body.image = "noImage";
    }

    await sparrestApi().createAd(endpoint,body);
};

const loadImg = async (image) => {
    let imageUrl;
  
    try {
      const uploadManager = new Bytescale.UploadManager({
        apiKey: "public_FW25biuB7FCTi4QPc78WebD9jExu"
      });
    
      const { fileUrl } = await uploadManager.upload({ data: image });
      
      imageUrl = fileUrl;
    } catch (error) {
      imageUrl = null;
    }
  
    return imageUrl;
  }

export const updateAd = async (formData, image, adId) => {
  const idObj = JSON.parse(adId);
  const endpoint = `api/commercial/${idObj.id}`;
  const imageUrl = await loadImg(image);
  const dateNow = new Date();
  const date = dateNow.toString();

  const body = {
    name: formData.get("name"),
    price: formData.get("price"),
    opType: formData.get("operationType"),
    description: formData.get("description"),
    date: date,
  };

  if(imageUrl) {
      body.image =imageUrl;
  } else {
      body.image = "noImage";
  }

  await sparrestApi().updateAd(endpoint, body);
}