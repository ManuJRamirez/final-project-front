import { postAd, updateAd } from "./postAdModel.js";
import { printEvent } from "../tools/printEvent.js"

export const postAdController = (adForm, adId) =>{
    const postAdButton = document.getElementById('postAdButton');
    adForm.addEventListener('submit', async(event) => {
        postAdButton.disabled = true;
        event.preventDefault();

        const formData = new FormData(adForm);
        const fileInput = adForm.querySelector('#image');


        try {
            printEvent('adCreationPrintLoader', null, adForm);
            if (adId === null) {
                await postAd(formData, fileInput.files[0]);
                printEvent('adCreation', {notificationType: 'success', message:'¡Felicidades!¡Anuncio creado correctamente'}, adForm);
            } else {
                localStorage.removeItem('adId');
                await updateAd(formData, fileInput.files[0], adId);
                printEvent('adCreation', {notificationType: 'success', message:'¡Felicidades!¡Anuncio actualizado correctamente'}, adForm);
            }
            setTimeout(() => {
                window.location = "../index.html"
            },2000);
        } catch (error) {
            printEvent('adCreation', {notificationType: 'error', message: 'Error al crear el anuncio. Intentelo de nuevo, por favor'}, adForm);
            postAdButton.disabled = false; 
        } finally{
            printEvent('adCreationHideLoader', null, adForm);
        }
    });
    
};


export const loadInfoToEdit = (adInfo, adForm) => {
    if(adInfo !== null) {
        const parseAdInfo = JSON.parse(adInfo);
        localStorage.removeItem('infoAd');
        const name = adForm.querySelector('#name');
        const price = adForm.querySelector('#price');
        const opType = adForm.querySelector('#operationType');
        const description = adForm.querySelector('#description');
        name.value = parseAdInfo.name;
        price.value = parseAdInfo.price;
        opType.value = parseAdInfo.opType;
        description.value = parseAdInfo.description;
    }
}
