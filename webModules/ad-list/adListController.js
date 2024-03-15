import { getAdverts } from "./adListModel.js";
import { adListTemplate, emptyAdListTemplate } from "./adListView.js";
import { printEvent } from "../tools/printEvent.js";

export const adListController = async(adList) => {
    let adverts = [];

    try {
        printEvent('loadingListAdvs', null, adList);
        adverts = await getAdverts();
        printEvent('advertListLoaded', {notificationType:'success',message: "Anuncios cargados correctamente"}, adList);
    } catch (error) {
        printEvent('advertListLoaded', {notificationType:'error',message: "No se han podido cargar los anuncios. Disculpe las molestias"}, adList);
    } finally {
        printEvent('loadingListAdvsOver', null, adList);
    }

    if(adverts.length === 0) {
        adList.innerHTML = emptyAdListTemplate();
        printEvent('adListEmpty', {notificationType: 'success', message: "No hay anuncios para mostrar"}, adList);
    } else {
        printAdList(adverts, adList);
    }
};




const printAdList = (adverts, adList) => {
    adverts.forEach(ad => {
        const adContainer = document.createElement('div');

        adContainer.classList.add('ad');
        adContainer.innerHTML = adListTemplate(ad);

        adList.appendChild(adContainer);
    });
}