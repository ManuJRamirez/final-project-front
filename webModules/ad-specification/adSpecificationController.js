import { getOneAd, deleteOneAd } from "./adSpecificationModel.js";
import { adTemplate } from "./adSpecificationView.js";
import { printEvent } from "../tools/printEvent.js";
import { decodeToken } from "../tools/decodeToken.js";

export const adSpecificationController = async (adInfoSection, adId) => {
    try {
        printEvent('oneAdLoading', null, adInfoSection);
        const ad = await getOneAd(adId);
        printEvent('oneAdNotification', {notificationType: 'success', message: '¡Anuncio cargado correctamente!'}, adInfoSection);
        adInfoSection.innerHTML = adTemplate(ad);
        userDeleteAuthorization(ad, adInfoSection);
    } catch (error) {
        printEvent('oneAdNotification', {notificationType: 'error', message:'No se ha podido cargar el anuncio. Disculpe las molestias'}, adInfoSection);
    } finally {
        printEvent('oneAdLoadingOver', null, adInfoSection);
    }
    
};

const showDeleteAdButton = (ad , adInfoSection) => {
    
    try {
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Borrar Anuncio';
        
        deleteButton.addEventListener('click', async () => {
            printEvent('oneAdDeleteLoading', null, adInfoSection);
            deleteButton.disabled = true; 
            if(confirm('¿Seguro que quieres eliminar el anuncio?')) {
                await deleteOneAd(ad.id);
                printEvent('oneAdDeleted', {notificationType: 'success', message: '¡Anuncio eliminado correctamente!'}, adInfoSection);
                setTimeout(() =>{
                    window.location = 'index.html';
                }, 3000);
            } else {
                deleteButton.disabled = false;
            }
            printEvent('oneAdDeleteLoadingOver', null, adInfoSection);
        });
        adInfoSection.appendChild(deleteButton);
        
    } catch (error) {
        printEvent('oneAdDeleted', {notificationType:'error', message: '¡El anuncio no ha podido ser eliminado! ¡Inténtelo mas tarde, por favor!'});
    } finally {
        printEvent('oneAdDeleteLoadingOver', null, adInfoSection);
    }
};

const userDeleteAuthorization = (ad, adInfoSection) => {
    const token = localStorage.getItem('token');
    
    if (token) {
        const { userId } = decodeToken(token);
        
        if (userId === ad.userId) {
            showDeleteAdButton(ad, adInfoSection);
            printEditAdButton(ad, adInfoSection);
        }
    }
};


const printEditAdButton = (ad, adInfoSection) => {
    try {
        const editButton = document.createElement('button');
        editButton.textContent = 'Editar Anuncio';

        editButton.addEventListener('click', async() => {
            const adInfo = await getOneAd(ad.id);
            const bodyId = {
                id: adInfo.id
            }
            const body = {
                name: adInfo.name,
                price: adInfo.price,
                opType: adInfo.opType,
                description: adInfo.description
            };

            window.localStorage.setItem('adId', JSON.stringify(bodyId));
            window.localStorage.setItem('infoAd', JSON.stringify(body));
            window.location = 'post-ad.html';

        });

        adInfoSection.appendChild(editButton);
        
    } catch (error) {
        
    }
}
